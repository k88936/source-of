/**
 * Page Generator - Creates static Vue pages from S3 data
 * This script generates all pages during the Vite build process
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {S3StorageProvider} from './storage/s3-provider.js';
import {PackageService} from './services/package-service.js';
import {version} from "vue";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class Generator {
    constructor() {
        this.storageProvider = new S3StorageProvider();
        this.packageService = new PackageService(this.storageProvider);
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
        const packagePageContent =
            `<template>
  <div class="package-page">
    <el-header class="package-header">
      <el-button @click="goHome" icon="ArrowLeft" type="text">
        Back to Home
      </el-button>
      <h1>{{ packageInfo.displayName }}</h1>
      <p>{{ packageInfo.description }}</p>
    </el-header>

    <el-main>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card title="Latest Version">
            <template #header>
              <div class="card-header">
                <span>Latest Version: {{ packageInfo.latestVersion }}</span>
                <el-button 
                  type="primary" 
                  @click="downloadLatest"
                  icon="Download"
                >
                  Download Latest
                </el-button>
              </div>
            </template>

            <div v-if="readme" class="readme-content" v-html="readme"></div>
            <div v-else class="no-readme">
              <el-empty description="No documentation available"></el-empty>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card title="All Versions">
            <div class="version-list">
              <div 
                v-for="version in packageInfo.versions" 
                :key="version.version"
                class="version-item"
              >
                <div class="version-info">
                  <strong>{{ version.version }}</strong>
                  <span class="version-date">{{ formatDate(version.date) }}</span>
                </div>
                <el-button 
                  size="small" 
                  @click="navigateToVersion(version.version)"
                >
                  View
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'PackagePage',
  data() {
    return {
      packageInfo: ${JSON.stringify(pkg, null, 6)},
      readme: null
    };
  },
  async created() {
    // Load README content for latest version
    await this.loadReadme();
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    navigateToVersion(version) {
      this.$router.push(\`/\${this.packageInfo.name}/\${version}\`);
    },
    downloadLatest() {
      this.$router.push(\`/\${this.packageInfo.name}/latest\`);
    },
    async loadReadme() {
      this.readme = ${JSON.stringify(await this.packageService.getReadme(pkg.name, pkg.latestVersion))};
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.package-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.package-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
}

.package-header h1 {
  margin: 10px 0 5px 0;
  font-size: 2rem;
}

.package-header p {
  margin: 0;
  opacity: 0.9;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.readme-content {
  max-height: 600px;
  overflow-y: auto;
  padding: 10px;
  background-color: #fafafa;
  border-radius: 4px;
}

.version-list {
  max-height: 400px;
  overflow-y: auto;
}

.version-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.version-info {
  display: flex;
  flex-direction: column;
}

.version-date {
  font-size: 0.8rem;
  color: #666;
}
</style>
`;

        const packageDir = path.join(this.outputDir, pkg.name);
        if (!fs.existsSync(packageDir)) {
            fs.mkdirSync(packageDir, {recursive: true});
        }

        fs.writeFileSync(path.join(packageDir, 'index.vue'), packagePageContent);
    }

    async generateVersionPages(pkg) {
        console.log(`Generating version pages for ${pkg.name}...`);

        for (const vsn of pkg.versions) {
            const versionPageContent = `<template>
  <div class="version-page">
    <el-header class="version-header">
      <el-button @click="goBack" icon="ArrowLeft" type="text">
        Back to {{ packageInfo.displayName }}
      </el-button>
      <h1>{{ packageInfo.displayName }} {{ versionInfo.version }}</h1>
      <p>Released: {{ formatDate(versionInfo.date) }}</p>
    </el-header>

    <el-main>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card title="Download Files">
            <div class="file-list">
              <div 
                v-for="file in versionInfo.files" 
                :key="file.name"
                class="file-item"
              >
                <div class="file-info">
                  <el-icon><Document /></el-icon>
                  <div class="file-details">
                    <strong>{{ file.name }}</strong>
                    <span class="file-size">{{ formatSize(file.size) }}</span>
                  </div>
                </div>
                <el-button 
                  type="primary" 
                  @click="downloadFile(file)"
                  icon="Download"
                >
                  Download
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card title="Version Information">
            <el-descriptions :column="1" border>
              <el-descriptions-item label="Version">{{ versionInfo.version }}</el-descriptions-item>
              <el-descriptions-item label="Release Date">{{ formatDate(versionInfo.date) }}</el-descriptions-item>
              <el-descriptions-item label="File Count">{{ versionInfo.files.length }}</el-descriptions-item>
              <el-descriptions-item label="Total Size">{{ formatSize(totalSize) }}</el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card title="Documentation" style="margin-top: 20px;" v-if="readme">
            <div class="readme-content" v-html="readme"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import { Document } from '@element-plus/icons-vue';

export default {
  name: 'VersionPage',
  components: {
    Document
  },
  data() {
    return {
      packageInfo: ${JSON.stringify({
                name: pkg.name,
                displayName: pkg.displayName || pkg.name,
                description: pkg.description || ''
            }, null, 6)},
      versionInfo: ${JSON.stringify(vsn, null, 6)},
      readme: null
    };
  },
  computed: {
    totalSize() {
      return this.versionInfo.files.reduce((total, file) => total + file.size, 0) || 0;
    }
  },
  async created() {
    await this.loadReadme();
  },
  methods: {
    goBack() {
      this.$router.push(\`/\${this.packageInfo.name}\`);
    },
    downloadFile(file) {
      // Open the S3 permanent link in a new tab
      window.open(file.downloadUrl, '_blank');
    },
    async loadReadme() {
      this.readme = ${JSON.stringify(await this.packageService.getReadme(pkg.name, vsn.version))};
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
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

<style scoped>
.version-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.version-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
}

.version-header h1 {
  margin: 10px 0 5px 0;
  font-size: 1.8rem;
}

.version-header p {
  margin: 0;
  opacity: 0.9;
}

.file-list {
  max-height: 400px;
  overflow-y: auto;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-details {
  display: flex;
  flex-direction: column;
}

.file-size {
  font-size: 0.8rem;
  color: #666;
}

.readme-content {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  background-color: #fafafa;
  border-radius: 4px;
}
</style>
`;

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
// if (import.meta.url === `file://${process.argv[1]}`) {
const generator = new Generator();
generator.generate().catch(console.error);
// }
