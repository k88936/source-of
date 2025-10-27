<script>
import {ArrowLeft, Box, View,} from '@element-plus/icons-vue';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';

export default {
  name: 'PackagePage',
  computed: {
    View() {
      return View
    },
  },
  components: {
    ArrowLeft, Box, View, MarkdownRenderer
  },
  data() {
    return {
      // Will be injected by generator
      packageInfo: {
      "name": "Win10",
      "displayName": "Win10",
      "description": "",
      "latestVersion": "en",
      "versions": [
            {
                  "version": "en",
                  "date": "2025-08-12T10:39:42.391Z",
                  "files": [
                        {
                              "name": "Win10_English_x64.iso",
                              "key": "Win10/en/Win10_English_x64.iso",
                              "size": 4893900800,
                              "lastModified": "2025-08-12T10:39:42.391Z",
                              "downloadUrl": "https://rustfs.k88936.top/software-release/Win10/en/Win10_English_x64.iso"
                        }
                  ]
            }
      ]
},
      readme: null,
    };
  },
  async created() {
    // Load README content for latest version
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    navigateToVersion(version) {
      this.$router.push(`/${this.packageInfo.name}/${version}`);
    },
    viewLatest() {
      this.navigateToVersion(this.packageInfo.latestVersion);
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
};
</script>
<template>
  <div class="package-page">
    <div class="package-header">
      <el-container>
        <el-main style="max-width: 1200px; margin: 0 auto;">
          <div class="header-nav">
            <el-button @click="goHome" text type="primary">
              <el-icon>
                <ArrowLeft/>
              </el-icon>
              Back to releases
            </el-button>
          </div>
          <div class="header-content">
            <div class="package-info">
              <el-icon size="32" class="package-icon">
                <Box/>
              </el-icon>
              <div class="package-details">
                <h1>{{ packageInfo.displayName }}</h1>
              </div>
            </div>
            <div class="package-actions">
              <el-button type="primary" @click="viewLatest" :icon="View">
                Latest
              </el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>

    <el-main class="main-content">
      <el-col>
            <h4>Releases</h4>
            <div class="version-list">
              <div
                  v-for="version in packageInfo.versions"
                  :key="version.version"

                  class="version-item"
                  @click="navigateToVersion(version.version)">
                <div class="version-info">
                  <div class="version-header">
                    <strong>{{ version.version }}</strong>
                    <el-tag v-if="version.version === packageInfo.latestVersion" size="small" type="success">Latest
                    </el-tag>
                  </div>
                  <div class="version-meta">
                    <span class="version-date">{{ formatDate(version.date) }}</span>
                    <span class="file-count">{{ version.files?.length || 0 }} files</span>
                  </div>
                </div>
            </div>
        </div>
      </el-col>
    </el-main>
  </div>
</template>


<style scoped>
.package-page {
  min-height: 100vh;
  background-color: var(--el-bg-color-page);
}

.package-header {
  padding: 16px 0 24px 0;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
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

.package-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.package-icon {
  color: var(--el-text-color-regular);
}

.package-details h1 {
  margin: 0 0 4px 0;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
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

.readme-section h4 {
  margin: 0 0 12px 0;
  color: var(--el-text-color-primary);
  font-size: 1rem;
  font-weight: 600;
}

.version-list {
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
}

.version-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid var(--el-border-color);
  transition: background-color 0.15s ease;
}

.version-item:hover {
  background-color: var(--el-bg-color-page);
}

.version-item:last-child {
  border-bottom: none;
}

.version-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.version-meta {
  display: flex;
  gap: 12px;
  font-size: 0.75rem;
  color: var(--el-text-color-regular);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .package-info {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .package-actions {
    justify-content: stretch;
  }
}
</style>
