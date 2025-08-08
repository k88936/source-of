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
.readme-section h4 {
  margin: 0 0 12px 0;
  color: #24292f;
  font-size: 1rem;
  font-weight: 600;
}


.version-list {
  background: white;
  border: 1px solid #d1d9e0;
  border-radius: 6px;
}

.version-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #d8dee4;
  transition: background-color 0.15s ease;
}

.version-item:hover {
  background-color: #f6f8fa;
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
