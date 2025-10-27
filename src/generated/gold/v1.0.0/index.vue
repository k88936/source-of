<script>
import {ArrowLeft, Box, Download, Document} from '@element-plus/icons-vue';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import JSZip from 'jszip';

export default {
  name: 'VersionPage',
  components: {
    ArrowLeft, Box, Download, Document, MarkdownRenderer
  },
  data() {
    return {
      // Will be injected by generator
      packageInfo: {
      "name": "gold",
      "displayName": "gold",
      "description": ""
},
      versionInfo: {
      "version": "v1.0.0",
      "date": "2025-10-25T05:50:56.942Z",
      "files": [
            {
                  "name": "README.md",
                  "key": "gold/v1.0.0/README.md",
                  "size": 3997,
                  "lastModified": "2025-10-25T05:28:12.231Z",
                  "downloadUrl": "https://rustfs.k88936.top/software-release/gold/v1.0.0/README.md"
            },
            {
                  "name": "gold",
                  "key": "gold/v1.0.0/gold",
                  "size": 4983336,
                  "lastModified": "2025-10-25T05:50:56.942Z",
                  "downloadUrl": "https://rustfs.k88936.top/software-release/gold/v1.0.0/gold"
            },
            {
                  "name": "gold.exe",
                  "key": "gold/v1.0.0/gold.exe",
                  "size": 3712000,
                  "lastModified": "2025-10-25T05:28:11.271Z",
                  "downloadUrl": "https://rustfs.k88936.top/software-release/gold/v1.0.0/gold.exe"
            }
      ]
},
      readme: "# Gold - Release Management Tool\r\n\r\nGold is a command-line tool for uploading software release assets to cloud storage backends like S3.\r\n\r\n## Features\r\n\r\n- [x] Upload files to S3-compatible storage (AWS S3, MinIO, etc.)\r\n- [x] Glob pattern support for file selection (`*.zip`, `dist/*`, `**/*.exe`)\r\n- [x] Content type detection for various file formats\r\n- [x] Duplicate file detection and skipping\r\n- [x] Custom display names for files\r\n- [x] Configuration via environment variables or command-line overrides\r\n- [x] Comprehensive error handling and validation\r\n\r\n## Installation\r\n\r\n```bash\r\ncargo install --path .\r\n```\r\n\r\n## Configuration\r\n\r\nGold requires the following environment variables:\r\n\r\n- `ACCESS_KEY` - S3 access key ID\r\n- `SECRET_KEY` - S3 secret access key\r\n- `BUCKET_NAME` - S3 bucket name\r\n- `AWS_REGION` - AWS region (default: us-east-1)\r\n- `S3_ENDPOINT` - Custom S3 endpoint (optional, for MinIO or other S3-compatible services)\r\n\r\n### Example .env file\r\n\r\n```env\r\nACCESS_KEY=your_access_key_here\r\nSECRET_KEY=your_secret_key_here\r\nBUCKET_NAME=my-releases-bucket\r\nAWS_REGION=us-west-2\r\nS3_ENDPOINT=http://localhost:9000\r\n```\r\n\r\n## Usage\r\n\r\n### Basic Usage\r\n\r\nUpload a single file:\r\n```bash\r\ngold upload myapp v1.0.0 target/release/myapp.exe\r\n```\r\n\r\nUpload multiple files:\r\n```bash\r\ngold upload myapp v1.0.0 target/release/myapp.exe README.md\r\n```\r\n\r\n### Glob Patterns\r\n\r\nUpload all ZIP files in a directory:\r\n```bash\r\ngold upload myapp v1.0.0 \"dist/*.zip\"\r\n```\r\n\r\nUpload all files recursively:\r\n```bash\r\ngold upload myapp v1.0.0 \"dist/**/*\"\r\n```\r\n\r\nUpload files with specific extensions:\r\n```bash\r\ngold upload myapp v1.0.0 \"*.{exe,zip,tar.gz}\"\r\n```\r\n\r\n### Custom Display Names\r\n\r\nYou can specify custom display names for files using the `#` separator:\r\n```bash\r\ngold upload myapp v1.0.0 \"target/release/myapp.exe#Main Application\"\r\n```\r\n\r\n### Configuration Overrides\r\n\r\nOverride configuration values from the command line:\r\n```bash\r\ngold upload myapp v1.0.0 file.zip --config BUCKET_NAME=different-bucket --config AWS_REGION=eu-west-1\r\n```\r\n\r\n## File Organization\r\n\r\nFiles are uploaded to S3 with the following key structure:\r\n```\r\n{package_name}/{tag}/{filename}\r\n```\r\n\r\nFor example:\r\n- Package: `myapp`\r\n- Tag: `v1.0.0` \r\n- File: `myapp.exe`\r\n- S3 Key: `myapp/v1.0.0/myapp.exe`\r\n\r\n## Supported File Types\r\n\r\nGold automatically detects content types for common file formats:\r\n\r\n- Archives: `.zip`, `.tar`, `.gz`\r\n- Executables: `.exe`, `.msi`, `.dmg`, `.deb`, `.rpm`\r\n- Documents: `.json`, `.txt`, `.md`\r\n- Default: `application/octet-stream`\r\n\r\n## Error Handling\r\n\r\nGold provides detailed error messages for common issues:\r\n\r\n- Missing or invalid configuration\r\n- Network connectivity problems\r\n- File not found errors\r\n- Invalid glob patterns\r\n- S3 permission issues\r\n\r\n## Examples\r\n\r\n### Uploading a Release\r\n\r\n```bash\r\n# Set up environment\r\nexport ACCESS_KEY=your_key\r\nexport SECRET_KEY=your_secret\r\nexport BUCKET_NAME=releases\r\nexport AWS_REGION=us-east-1\r\n\r\n# Upload release assets\r\ngold upload myproject v2.1.0 \\\r\n  \"dist/myproject-*.zip\" \\\r\n  \"docs/README.md#Documentation\" \\\r\n  \"CHANGELOG.md\"\r\n```\r\n\r\n### Using with MinIO\r\n\r\n```bash\r\n# Configure for MinIO\r\nexport ACCESS_KEY=minioaccess\r\nexport SECRET_KEY=miniosecret\r\nexport BUCKET_NAME=releases\r\nexport AWS_REGION=us-east-1\r\nexport S3_ENDPOINT=http://localhost:9000\r\n\r\ngold upload myapp v1.0.0 \"*.zip\"\r\n```\r\n\r\n### CI/CD Integration\r\n\r\n```yaml\r\n# GitHub Actions example\r\n- name: Upload Release Assets\r\n  env:\r\n    ACCESS_KEY: ${{ secrets.S3_ACCESS_KEY }}\r\n    SECRET_KEY: ${{ secrets.S3_SECRET_KEY }}\r\n    BUCKET_NAME: my-releases\r\n    AWS_REGION: us-west-2\r\n  run: |\r\n    gold upload ${{ github.event.repository.name }} ${{ github.ref_name }} \\\r\n      \"dist/*.zip\" \\\r\n      \"dist/*.tar.gz\" \\\r\n      \"README.md#Documentation\"\r\n```\r\n\r\n## Development\r\n\r\n### Running Tests\r\n\r\n```bash\r\ncargo test\r\n```\r\n\r\n### Building\r\n\r\n```bash\r\ncargo build --release\r\n```\r\n\r\n## License\r\n\r\nThis project is licensed under the MIT License.\r\n"
    };
  },
  computed: {
    totalSize() {
      return this.versionInfo.files?.reduce((total, file) => total + file.size, 0) || 0;
    }
  },
  async created() {
  },
  methods: {
    goBack() {
      this.$router.push(`/${this.packageInfo.name}`);
    },
    async downloadAllAsZip() {
      if (!this.versionInfo.files || this.versionInfo.files.length === 0) return;
      const zip = new JSZip();
      // Fetch all files and add to zip
      await Promise.all(this.versionInfo.files.map(async file => {
        try {
          const response = await fetch(file.downloadUrl);
          const blob = await response.blob();
          zip.file(file.name, blob);
        } catch (e) {
          // Optionally handle fetch errors
        }
      }));
      // Generate zip and trigger download
      const content = await zip.generateAsync({type: 'blob'});
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `${this.packageInfo.displayName || 'assets'}-${this.versionInfo.version || ''}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    formatSize(bytes) {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
  }
};
</script>
<template>
  <div class="version-page">
    <div class="version-header">
      <el-container>
        <el-main style="max-width: 1200px; margin: 0 auto;">
          <div class="header-nav">
            <el-button @click="goBack" text type="primary">
              <el-icon>
                <ArrowLeft/>
              </el-icon>
              {{ packageInfo.displayName }}
            </el-button>
          </div>
          <div class="header-content">
            <div class="version-info">
              <el-icon size="32" class="version-icon">
                <Box/>
              </el-icon>
              <div class="version-details">
                <h1>{{ packageInfo.displayName }} {{ versionInfo.version }}</h1>
                <p class="release-info">Released on {{ formatDate(versionInfo.date) }}</p>
              </div>
            </div>
            <div class="version-actions">
              <el-button type="primary" @click="downloadAllAsZip" :icon="Download">
                Download All as ZIP
              </el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>

    <el-main class="main-content">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="content-section">
            <h3>Artifact</h3>
            <div class="assets-list">
              <div
                  v-for="file in versionInfo.files"
                  :key="file.name"
                  class="asset-item"
              >
                <div class="asset-info">
                  <el-icon size="16" class="asset-icon">
                    <Document/>
                  </el-icon>
                  <div class="asset-details">
                    <div class="asset-name">{{ file.name }}</div>
                    <div class="asset-meta">{{ formatSize(file.size) }}</div>
                  </div>
                </div>
                <div class="asset-actions">
                  <a
                      :href="file.downloadUrl"
                      target="_blank"
                      rel="noopener"
                  >
                    <el-button size="small" :icon="Download">
                      Download
                    </el-button>
                  </a>
                </div>
              </div>
            </div>

            <div v-if="readme" class="readme-section">
              <h3>Documentation</h3>
              <MarkdownRenderer :content="readme" empty-message="No documentation available"/>
            </div>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="sidebar">
            <h4>Release Information</h4>
            <div class="info-list">
              <div class="info-item">
                <span class="info-label">Version</span>
                <el-tag type="primary">{{ versionInfo.version }}</el-tag>
              </div>
              <div class="info-item">
                <span class="info-label">Release Date</span>
                <span class="info-value">{{ formatDate(versionInfo.date) }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Total Files</span>
                <span class="info-value">{{ versionInfo.files?.length || 0 }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Total Size</span>
                <span class="info-value">{{ formatSize(totalSize) }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>


<style scoped>
.version-page {
  min-height: 100vh;
  background-color: var(--el-bg-color-page);
}

.version-header {
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  padding: 16px 0 24px 0;
}

.header-nav {
  margin-bottom: 16px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0 20px;
}

.version-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.version-icon {
  color: var(--el-text-color-regular);
}

.version-details h1 {
  margin: 0 0 4px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.release-info {
  margin: 0;
  color: var(--el-text-color-regular);
  font-size: 1rem;
}

.version-actions {
  display: flex;
  gap: 8px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
}

.content-section h3 {
  margin: 0 0 16px 0;
  color: var(--el-text-color-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.assets-list {
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 24px;
}

.asset-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--el-border-color);
  transition: background-color 0.15s ease;
}

.asset-item:hover {
  background-color: var(--el-bg-color-page);
}

.asset-item:last-child {
  border-bottom: none;
}

.asset-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.asset-icon {
  color: var(--el-text-color-regular);
}

.asset-name {
  font-weight: 500;
  color: var(--el-text-color-primary);
  margin-bottom: 2px;
}

.asset-meta {
  font-size: 0.75rem;
  color: var(--el-text-color-regular);
}

.readme-section {
  margin-top: 24px;
}

.sidebar h4 {
  margin: 0 0 12px 0;
  color: var(--el-text-color-primary);
  font-size: 1rem;
  font-weight: 600;
}

.info-list {
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  overflow: hidden;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--el-border-color);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 0.875rem;
  color: var(--el-text-color-regular);
  font-weight: 500;
}

.info-value {
  font-size: 0.875rem;
  color: var(--el-text-color-primary);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .version-info {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .asset-item {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .asset-actions {
    align-self: flex-end;
  }
}
</style>
