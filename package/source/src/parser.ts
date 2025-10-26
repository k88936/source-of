/**
 * Package service for managing software packages
 * Uses abstract storage provider for backend operations
 */

import {StorageProvider} from './storage/storage-provider';


// Define interfaces for data structures
export interface VersionInfo {
    name: string;
    displayName?: string;
    description?: string;
    version: string;
}

export interface PackageData {
    packages: Array<{
        name: string;
        displayName: string;
        description: string;
        latestVersion?: string;
        versions: VersionInfo[];
    }>;
    lastUpdated: string;
}

/**
 * Service class for package operations
 */
export class Parser {
    constructor(storageProvider) {
        this.storage = storageProvider;
    }

    /**
     * Get all software packages (alias for compatibility with page generator)
     * @returns {Promise<Array>} - Array of software packages
     */
    async listPackages() {
        return this.getPackages();
    }

    /**
     * Get all software packages
     * @returns {Promise<Array>} - Array of software packages
     */
    async getPackages() {
        try {
            const files = await this.storage.listFiles();

            // Group files by package name (first directory level)
            const packages = {};

            for (const file of files) {
                const parts = file.key.split('/');

                if (parts.length > 1) {
                    const packageName = parts[0];

                    if (!packages[packageName]) {
                        packages[packageName] = {
                            name: packageName,
                            displayName: packageName,
                            description: '',
                            versions: new Set(),
                        };
                    }

                    if (parts.length > 2) {
                        packages[packageName].versions.add(parts[1]);
                    }
                }
            }

            // Convert to array and convert versions Set to array
            return Object.values(packages).map(pkg => ({
                ...pkg,
                versions: Array.from(pkg.versions)
            }));
        } catch (error) {
            console.error('Error getting packages:', error);
            throw error;
        }
    }

    /**
     * Get versions for a package (alias for compatibility with page generator)
     * @param {string} packageName - The name of the package
     * @returns {Promise<Array>} - Array of versions
     */
    async listVersions(packageName) {
        return this.getPackageVersions(packageName);
    }

    /**
     * Get all versions of a specific package
     * @param {string} packageName - The name of the package
     * @returns {Promise<Array>} - Array of versions
     */
    async getPackageVersions(packageName) {
        try {
            const files = await this.storage.listFiles(`${packageName}/`);

            // Group files by version (second directory level)
            const versions = {};

            for (const file of files) {
                const parts = file.key.split('/');

                if (parts.length > 2) {
                    const version = parts[1];

                    if (!versions[version]) {
                        versions[version] = {
                            version,
                            date: file.lastModified,
                            files: [],
                        };
                    }


                }
            }
            for (let version in versions) {

                const files = await this.storage.listFiles(`${packageName}/${version}/`);

                for (const file of files) {
                    const parts = file.key.split('/');
                    if (parts.length < 3 || parts[2] === "") continue;

                    versions[version].files.push({
                        name: parts.slice(2).join('/'),
                        key: file.key,
                        size: file.size,
                        lastModified: file.lastModified,
                        downloadUrl: this.getDownloadUrl(file.key)
                    });

                    // Update date to latest file modification
                    if (new Date(file.lastModified) > new Date(versions[version].date)) {
                        versions[version].date = file.lastModified;
                    }
                }
            }

            // Sort versions by date (newest first)
            const versionArray = Object.values(versions);
            versionArray.sort((a, b) => new Date(b.date) - new Date(a.date));

            return versionArray;
        } catch (error) {
            console.error(`Error getting versions for package ${packageName}:`, error);
            throw error;
        }
    }

    /**
     * Get the latest version of a package
     * @param {string} packageName - The name of the package
     * @returns {Promise<Object|null>} - The latest version or null if no versions exist
     */
    async getLatestVersion(packageName) {
        try {
            const versions = await this.getPackageVersions(packageName);

            if (versions.length === 0) {
                return null;
            }

            return versions[0]; // Already sorted by date
        } catch (error) {
            console.error(`Error getting latest version for package ${packageName}:`, error);
            throw error;
        }
    }

    /**
     * Get the README content for a package version
     * @param {string} packageName - The name of the package
     * @param {string} vsn - The version of the package
     * @returns {Promise<string|null>} - The README content or null if not found
     */
    async getReadme(packageName, vsn) {
        try {
            const files = await this.storage.listFiles(`${packageName}/${vsn}/`);

            // Look for README file
            const readmeFile = files.find(file =>
                file.key.toLowerCase().includes('readme') ||
                file.key.toLowerCase().includes('README')
            );

            if (!readmeFile) {
                return null;
            }

            return await this.storage.readFile(readmeFile.key);
        } catch (error) {
            console.error(`Error getting README for package ${packageName} version ${vsn}:`, error);
            return null;
        }
    }

    /**
     * Generate a download URL for a file
     * @param {string} key - The key of the file
     * @returns {string} - The download URL
     */
    getDownloadUrl(key) {
        return this.storage.getDownloadUrl(key);
    }
}
