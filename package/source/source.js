/**
 * Page Generator - Creates static Vue pages from S3 data
 * This script generates all pages during the Vite build process
 */

import {S3StorageProvider} from './storage/s3-provider.js';
import {Parser} from './parser.js';

// Enhanced version comparison supporting v1.2.3, v8, build-149, plain numbers, etc.
function compareVersions(a, b) {
    const va = a.version || a;
    const vb = b.version || b;

    // Handle "latest" versions with higher priority
    if (va === "latest") return -1;
    if (vb === "latest") return 1;

    // Extract all number parts for semantic versioning comparison
    const numA = (va.match(/\d+/g) || []).map(Number);
    const numB = (vb.match(/\d+/g) || []).map(Number);

    // Compare each numeric component
    for (let i = 0; i < Math.max(numA.length, numB.length); i++) {
        const na = numA[i] || 0;
        const nb = numB[i] || 0;
        if (na !== nb) return nb - na; // Descending order (newer versions first)
    }

    // For equal numeric parts, sort alphabetically (handles -alpha, -beta, etc.)
    return vb.localeCompare(va);
}


class Source {
    constructor() {
        this.storageProvider = new S3StorageProvider();
        this.parser = new Parser(this.storageProvider);
    }

    async generate() {
        console.log('Starting page generation...');

        try {
            // Fetch all package data
            const packageData = await this.fetchPackageData();

            console.log('packages info fetch and parse completed successfully!');

            return packageData;
        } catch (error) {
            console.error('Error during page generation:', error);
            throw error('Page generation failed - cannot proceed with build');
        }
    }

    async fetchPackageData() {
        console.log('Fetching package data from storage...');

        try {
            const packages = await this.parser.listPackages();

            const packageData = {
                packages: [],
                lastUpdated: new Date().toISOString()
            };

            for (const pkg of packages) {
                let versions = await this.parser.listVersions(pkg.name);
                // Sort versions using custom logic
                versions = versions.sort(compareVersions);
                const latestVersion = versions[0]; // Now first is latest

                packageData.packages.push({
                    name: pkg.name,
                    displayName: pkg.displayName || pkg.name,
                    description: pkg.description || '',
                    latestVersion: latestVersion?.version,
                    versions: versions,
                });
            }

            return packageData;
        } catch (error) {
            console.error('Failed to fetch package data from S3 storage');
            console.error('-'.repeat(80));

            if (error.message.startsWith('S3 Connection Failed:')) {
                // Error is already well-formatted from S3StorageProvider
                console.error(error.message);
            } else {
                console.error('Error:', error.message);
                console.error('\nPlease verify your .env file contains:');
                console.error('  - S3_BUCKET_NAME');
                console.error('  - S3_REGION');
                console.error('  - S3_ACCESS_KEY_ID');
                console.error('  - S3_SECRET_ACCESS_KEY');
                console.error('  - S3_ENDPOINT (if using S3-compatible storage)');
            }

            console.error('-'.repeat(80));
            throw new Error('Package data fetch failed - cannot proceed with build');
        }
    }
}

// Export for use in a build process
export {Source};
