/**
 * Page Generator - Creates static Vue pages from S3 data
 * This script generates all pages during the Vite build process
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {S3StorageProvider} from './storage/s3-provider.js';
import {PackageService} from './services/package-service.js';
import {TemplateService} from './services/template-service.js';
import {version} from "vue";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Enhanced version comparison supporting v1.2.3, v8, build-149, plain numbers, etc.
function compareVersions(a, b) {
    const va = a.version || a;
    const vb = b.version || b;

    // Extract all number parts
    const numA = (va.match(/\d+/g) || []).map(Number);
    const numB = (vb.match(/\d+/g) || []).map(Number);

    // Compare number parts
    for (let i = 0; i < Math.max(numA.length, numB.length); i++) {
        const na = numA[i] || 0;
        const nb = numB[i] || 0;
        if (na !== nb) return nb - na; // Descending
    }

    // If numbers are equal, compare alphabetically (for -alpha, -beta, etc.)
    return vb.localeCompare(va);
}

// Example: compareVersions('3.11', '3.9') returns -1, so '3.11' > '3.9' in descending sort
// Example: compareVersions('v3.11.1', 'v3.9.5') returns -1, so 'v3.11.1' > 'v3.9.5'

class Generator {
    constructor() {
        this.storageProvider = new S3StorageProvider();
        this.packageService = new PackageService(this.storageProvider);
        this.templateGenerator = new TemplateService();
        this.outputDir = path.resolve(__dirname, '../src/generated');
        this.dataFile = path.resolve(__dirname, '../src/data.js');
    }

    async generate() {
        console.log('Starting page generation...');

        try {
            // Ensure output directory exists
            await this.ensureDirectories();

            // Fetch all package data
            const packageData = await this.fetchPackageData();

            // Generate data.js file
            await this.generateDataFile(packageData);

            // Generate package pages
            for (const pkg of packageData.packages) {
                await this.generatePackagePage(pkg);
                await this.generateVersionPages(pkg);
            }
            console.log('Page generation completed successfully!');
        } catch (error) {
            console.error('Error during page generation:', error);
            throw error;
        }
    }

    async ensureDirectories() {
        const dirs = [
            this.outputDir,
        ];

        for (const dir of dirs) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {recursive: true});
            }
        }
    }

    async fetchPackageData() {
        console.log('Fetching package data from storage...');

        try {
            const packages = await this.packageService.listPackages();

            const packageData = {
                packages: [],
                lastUpdated: new Date().toISOString()
            };

            for (const pkg of packages) {
                let versions = await this.packageService.listVersions(pkg.name);
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
            console.error('\n❌ Failed to fetch package data from S3 storage');
            console.error('━'.repeat(80));

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

            console.error('━'.repeat(80));
            throw new Error('Package data fetch failed - cannot proceed with build');
        }
    }

    async generateDataFile(packageData) {
        console.log('Generating data.js...');
        const dataContent =
            `// Auto-generated data file
// Last updated: ${packageData.lastUpdated}

export const packageData = ${JSON.stringify(packageData, null, 2)};

export default packageData;
`;
        fs.writeFileSync(this.dataFile, dataContent);
    }

    async generatePackagePage(pkg) {
        console.log(`Generating package page for ${pkg.name}...`);

        // Load README for latest version
        const readme = await this.packageService.getReadme(pkg.name, pkg.latestVersion);

        // Generate page content using template
        const packagePageContent = this.templateGenerator.generatePackagePage(pkg, readme);

        const packageDir = path.join(this.outputDir, pkg.name);
        if (!fs.existsSync(packageDir)) {
            fs.mkdirSync(packageDir, {recursive: true});
        }

        fs.writeFileSync(path.join(packageDir, 'index.vue'), packagePageContent);
    }

    async generateVersionPages(pkg) {
        console.log(`Generating version pages for ${pkg.name}...`);

        for (const vsn of pkg.versions) {
            // Load README for this version
            const readme = await this.packageService.getReadme(pkg.name, vsn.version);

            // Generate page content using template
            const versionPageContent = this.templateGenerator.generateVersionPage(pkg, vsn, readme);

            const versionDir = path.join(this.outputDir, pkg.name, vsn.version);
            if (!fs.existsSync(versionDir)) {
                fs.mkdirSync(versionDir, {recursive: true});
            }

            fs.writeFileSync(path.join(versionDir, 'index.vue'), versionPageContent);
        }
    }


}

// Export for use in a build process
export {Generator};

// Run if called directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {const generator = new Generator();
generator.generate().catch(console.error);
}
