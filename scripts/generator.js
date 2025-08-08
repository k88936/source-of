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
        const packages = await this.packageService.listPackages();

        const packageData = {
            packages: [],
            lastUpdated: new Date().toISOString()
        };

        for (const pkg of packages) {
            const versions = await this.packageService.listVersions(pkg.name);
            const latestVersion = versions[0]; // Assuming first is latest

            packageData.packages.push({
                name: pkg.name,
                displayName: pkg.displayName || pkg.name,
                description: pkg.description || '',
                latestVersion: latestVersion?.version,
                versions: versions,
                downloadCount: pkg.downloadCount || 0
            });
        }

        return packageData;
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

// Export for use in build process
export {Generator};

// Run if called directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {const generator = new Generator();
generator.generate().catch(console.error);
}
