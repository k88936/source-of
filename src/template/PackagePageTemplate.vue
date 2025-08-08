<script>
import {ArrowLeft, Box, Download, View,} from '@element-plus/icons-vue';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';

export default {
  name: 'PackagePage',
  computed: {
    View() {
      return View
    },
    Download() {
      return Download
    }
  },
  components: {
    ArrowLeft, Box, Download, View, MarkdownRenderer
  },
  data() {
    return {
      // Will be injected by generator
      packageInfo: {},
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
    downloadLatest() {
      this.$router.push(`/${this.packageInfo.name}/latest`);
    },
    viewLatest() {
      this.$router.push(`/${this.packageInfo.name}/${this.packageInfo.latestVersion}`);
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
        <el-main>
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
                <p class="package-description">{{ packageInfo.description || 'No description available' }}</p>
              </div>
            </div>
            <div class="package-actions">
              <el-button type="primary" @click="downloadLatest" :icon="Download">
                Download Latest
              </el-button>
              <el-button @click="viewLatest" :icon="View">
                View {{ packageInfo.latestVersion }}
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
            <h3>Latest Release</h3>
            <div class="latest-release">
              <div class="release-header">
                <el-tag type="success">{{ packageInfo.latestVersion }}</el-tag>
                <span class="release-date">Latest release</span>
              </div>
            </div>

            <div v-if="readme" class="readme-section">
              <h4>Documentation</h4>
              <MarkdownRenderer :content="readme" empty-message="No documentation available"/>
            </div>
            <div v-else class="no-readme">
              <el-empty description="No documentation available" :image-size="80"></el-empty>
            </div>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="sidebar">
            <div class="sidebar-section">
              <h4>Releases</h4>
              <div class="version-list">
                <div
                    v-for="version in packageInfo.versions"
                    :key="version.version"
                    class="version-item"
                    :class="{ 'latest': version.version === packageInfo.latestVersion }"
                >
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
                  <el-button size="small" @click="navigateToVersion(version.version)" text type="primary">
                    View
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>


<style scoped>
.package-page {
  min-height: 100vh;
  background-color: #fafbfc;
}

.package-header {
  background: white;
  border-bottom: 1px solid #d1d9e0;
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
}

.package-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.package-icon {
  color: #656d76;
}

.package-details h1 {
  margin: 0 0 4px 0;
  font-size: 1.75rem;
  font-weight: 600;
  color: #24292f;
}

.package-description {
  margin: 0;
  color: #656d76;
  font-size: 1rem;
}

.package-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
}

.content-section h3 {
  margin: 0 0 16px 0;
  color: #24292f;
  font-size: 1.25rem;
  font-weight: 600;
}

.latest-release {
  background: white;
  border: 1px solid #d1d9e0;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
}

.release-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.release-date {
  color: #656d76;
  font-size: 0.875rem;
}

.readme-section h4 {
  margin: 0 0 12px 0;
  color: #24292f;
  font-size: 1rem;
  font-weight: 600;
}

.sidebar h4 {
  margin: 0 0 12px 0;
  color: #24292f;
  font-size: 1rem;
  font-weight: 600;
}

.version-list {
  background: white;
  border: 1px solid #d1d9e0;
  border-radius: 6px;
  overflow: hidden;
}

.version-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #d8dee4;
  transition: background-color 0.15s ease;
}

.version-item:hover {
  background-color: #f6f8fa;
}

.version-item:last-child {
  border-bottom: none;
}

.version-item.latest {
  background-color: #f6f8fa;
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
  color: #656d76;
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
