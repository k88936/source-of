/**
 * Page Generator - Creates static Vue pages from S3 data
 * This script generates all pages during the Vite build process
 */
import {PackageInfo, Parser, VersionInfo,} from "./parser";
import {S3StorageProvider} from "./storage/s3-provider";

export interface PackageData {
    packages: PackageInfo[];
    lastUpdated: string;
}


// Enhanced version comparison supporting v1.2.3, v8, build-149, plain numbers, etc.
function compareVersions(a: VersionInfo, b: VersionInfo): number {
    const va = a.version;
    const vb = b.version;

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
    private readonly storageProvider: S3StorageProvider;
    private parser: Parser;

    constructor() {
        this.storageProvider = new S3StorageProvider();
        this.parser = new Parser(this.storageProvider);
    }

    async get(): Promise<PackageData> {
        console.log('Fetching package data from storage...');

        try {
            const packages = await this.parser.parse();

            for (const pkg of packages) {
                pkg.versions.sort(compareVersions);
                const latestVersion = pkg.versions[0]; // Now first is the latest

                const readme_file = latestVersion.files.find(file => file.name === "README.md");
                if (readme_file) {
                    pkg.readme = await this.storageProvider.readFile(readme_file.key)
                }
            }
            return {
                packages: packages,
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.error('Failed to fetch package data from S3 storage',error);
            console.error('-'.repeat(80));
            throw new Error('Package data fetch failed - cannot proceed with build');
        }
    }
}

// Export for use in a build process
export {PackageInfo, VersionInfo, Source};
