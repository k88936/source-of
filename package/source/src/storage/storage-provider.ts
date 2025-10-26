/**
 * Abstract storage interface for file backends
 * Defines the basic operations that any storage backend must implement
 */

export abstract class StorageProvider {
  /**
   * List all files with the given dir
   * @param dir - The dir to filter files by
   * @returns Array of file objects with {key, lastModified, size}
   */
  abstract listFiles(dir?: string): Promise<Array<{key: string, lastModified: string, size: number}>>;

  /**
   * Read the content of a file
   * @param key - The key/path of the file
   * @returns The file content as string
   */
  abstract readFile(key: string): Promise<string>;

  /**
   * Generate a public URL for downloading a file
   * @param key - The key/path of the file
   * @returns The download URL
   */
  abstract getDownloadUrl(key: string): string;

  /**
   * Check if a file exists
   * @param key - The key/path of the file
   * @returns Whether the file exists
   */
  abstract fileExists(key: string): Promise<boolean>;
}
