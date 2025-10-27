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
      "name": "Mindustry",
      "displayName": "Mindustry",
      "description": ""
},
      versionInfo: {
      "version": "150.1",
      "date": "2025-08-15T06:30:58.769Z",
      "files": [
            {
                  "name": "[Android][BETA][v150.1]Mindustry.apk.1",
                  "key": "Mindustry/150.1/[Android][BETA][v150.1]Mindustry.apk.1",
                  "size": 64193527,
                  "lastModified": "2025-08-15T06:30:58.769Z",
                  "downloadUrl": "https://rustfs.k88936.top/software-release/Mindustry/150.1/[Android][BETA][v150.1]Mindustry.apk.1"
            }
      ]
},
      readme: null
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
