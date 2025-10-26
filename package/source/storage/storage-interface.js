/**
 * Abstract storage interface for file backends
 * Defines the basic operations that any storage backend must implement
 */

/**
 * Abstract base class for storage providers
 */
export class StorageProvider {
  /**
   * List all files with the given dir
   * @param {string} dir - The dir to filter files by
   * @returns {Promise<Array>} - Array of file objects with {key, lastModified, size}
   */
  async listFiles(dir = '') {
    throw new Error('listFiles method must be implemented by storage provider');
  }

  /**
   * Read the content of a file
   * @param {string} key - The key/path of the file
   * @returns {Promise<string>} - The file content as string
   */
  async readFile(key) {
    throw new Error('readFile method must be implemented by storage provider');
  }

  /**
   * Generate a public URL for downloading a file
   * @param {string} key - The key/path of the file
   * @returns {string} - The download URL
   */
  getDownloadUrl(key) {
    throw new Error('getDownloadUrl method must be implemented by storage provider');
  }

  /**
   * Check if a file exists
   * @param {string} key - The key/path of the file
   * @returns {Promise<boolean>} - Whether the file exists
   */
  async fileExists(key) {
    throw new Error('fileExists method must be implemented by storage provider');
  }
}
