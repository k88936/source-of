/**
 * S3 storage provider implementation
 * Server-side script for build-time page generation
 */
import dotenv from 'dotenv';
import { S3Client, ListObjectsV2Command, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { StorageProvider,File } from './storage-provider';

// Load environment variables from .env file
dotenv.config();

/**
 * S3 implementation of the StorageProvider interface
 */
export class S3StorageProvider implements StorageProvider {
  private readonly accessKey: string;
  private readonly secretKey: string;
  private readonly bucketName: string;
  private readonly region: string;
  private readonly endpoint?: string;
  private readonly s3Client: S3Client;

  constructor() {
    // S3 configuration from environment variables
    this.accessKey = process.env.S3_ACCESS_KEY!;
    this.secretKey = process.env.S3_SECRET_KEY!;
    this.bucketName = process.env.S3_BUCKET_NAME!;
    this.region = process.env.AWS_REGION || 'us-east-1';
    this.endpoint = process.env.S3_ENDPOINT;

    // Validate required environment variables
    if (!this.accessKey || !this.secretKey || !this.bucketName) {
      throw new Error('Missing required environment variables: ACCESS_KEY, SECRET_KEY, BUCKET_NAME');
    }

    // Create S3 client
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
      },
      forcePathStyle: true, // Required for custom endpoints like MinIO
      ...(this.endpoint && {
        endpoint: this.endpoint,
        forcePathStyle: true
      })
    });
  }

  /**
   * List all files with the given prefix
   * @param dir - The prefix to filter files by
   * @returns Array of file objects
   */
  async listFiles(dir: string = ''): Promise<Array<File>> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        Prefix: dir,
      });

      const response = await this.s3Client.send(command);

      if (!response.Contents) {
        return [];
      }

      return response.Contents.map(object => ({
        key: object.Key!,
        lastModified: object.LastModified!.toISOString(),
        size: object.Size!
      }));
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  /**
   * Read the content of a file
   * @param key - The key of the file
   * @returns The file content as string
   */
  async readFile(key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const response = await this.s3Client.send(command);
      return await response.Body!.transformToString();
    } catch (error) {
      console.error(`Error reading file ${key}:`, error);
      throw error;
    }
  }

  /**
   * Generate a download URL for a file
   * @param key - The key of the file
   * @returns The download URL
   */
  getDownloadUrl(key: string): string {
    if (this.endpoint) {
      // For custom endpoints like MinIO
      return `${this.endpoint}/${this.bucketName}/${key}`;
    }
    // For AWS S3
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
  }

  /**
   * Check if a file exists
   * @param key - The key of the file
   * @returns Whether the file exists
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });
      await this.s3Client.send(command);
      return true;
    } catch (error: any) {
      if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
        return false;
      }
      console.error(`Error checking file existence ${key}:`, error);
      throw error;
    }
  }
}
