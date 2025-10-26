/**
 * Package service for managing software packages
 * Uses abstract storage provider for backend operations
 */

import {File, StorageProvider} from './storage/storage-provider';


export interface VersionInfo {
    version: string;
    date: string;
    files: Array<FileInfo>;
}

export interface PackageInfo {
    name: string;
    readme: string;
    versions: VersionInfo[];
}

export interface FileInfo {
    name: string;
    key: string;
    size: number;
    lastModified: string;
    downloadUrl: string;
}


/**
 * Service class for package operations
 */
export class Parser {
    private storage: StorageProvider;

    constructor(storageProvider: StorageProvider) {
        this.storage = storageProvider;
    }

    async parse(): Promise<Array<PackageInfo>> {
        interface TreeNode {
            [key: string]: TreeNode | File;
        }

        function buildTree(files: File[]): TreeNode {
            const tree: TreeNode = {};
            for (const file of files) {
                const parts = file.key.split('/').filter(Boolean); // Remove empty strings
                let current = tree;
                for (const part of parts) {
                    if (!(part in current)) {
                        current[part] = {};
                    }
                    current = current[part] as TreeNode;
                }
                // record file
                if (Object.keys(current).length === 0) {
                    const parentPath = parts.slice(0, -1);
                    let parent = tree;
                    for (const p of parentPath) {
                        parent = parent[p] as TreeNode;
                    }
                    parent[parts[parts.length - 1]] = file;
                }

            }
            return tree;

        }

        function renderTree(tree: TreeNode, prefix = ''): string {
            const entries = Object.entries(tree);
            let result = '';
            for (let i = 0; i < entries.length; i++) {
                const [name, node] = entries[i];
                const isLast = i === entries.length - 1;
                const connector = isLast ? '└── ' : '├── ';
                result += prefix + connector + name + '\n';

                if ('key' in node) {
                    continue
                }
                const childPrefix = prefix + (isLast ? '    ' : '│   ');
                result += renderTree(node as TreeNode, childPrefix);
            }
            return result;
        }

        const files: File[] = await this.storage.listFiles();
        const tree = buildTree(files);

        console.log(renderTree(tree))

        const result: Array<PackageInfo> = [];
        for (const package_name of Object.keys(tree)) {
            const versions_node = tree[package_name] as TreeNode;
            const versions: Array<VersionInfo> = [];
            console.assert(!("key" in versions_node))
            for (const version of Object.keys(versions_node)) {
                const files_node = versions_node[version] as TreeNode;
                const files: Array<FileInfo> = [];
                for (const file_name of Object.keys(files_node)) {
                    const file = files_node[file_name] as File;
                    console.assert("key" in file);
                    files.push({
                            downloadUrl: this.storage.getDownloadUrl(file.key),
                            key: file.key,
                            lastModified: "",
                            name: file_name,
                            size: file.size
                        }
                    )
                }

                versions.push({
                    date: "",
                    files: files,
                    version: version
                })

            }

            result.push({
                name: package_name,
                readme: "",
                versions: versions
            })
        }
        
        return result;
    }
}
