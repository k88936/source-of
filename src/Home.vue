<script>
import {packageData} from './data.js';
import {Search, ArrowRight, Box} from '@element-plus/icons-vue';

export default {
  name: 'Home',
  components: {
    Search,
    ArrowRight,
    Box
  },
  data() {
    return {
      packages: packageData.packages,
      searchText: ''
    };
  },
  computed: {
    filteredPackages() {
      if (!this.searchText) return this.packages;
      return this.packages.filter(pkg =>
          pkg.displayName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          (pkg.description && pkg.description.toLowerCase().includes(this.searchText.toLowerCase()))
      );
    },
    totalDownloads() {
      return this.packages.reduce((sum, pkg) => sum + (pkg.downloadCount || 0), 0);
    }
  },
  methods: {
    navigateToPackage(packageName) {
      this.$router.push(`/${packageName}`);
    },

  }
};
</script>

<template>
  <div class="homepage">
    <!-- Header Section -->
    <div class="header-section">
      <el-container>
        <el-main>
          <div class="header-content">
            <h1 class="page-title">Software Releases</h1>
            <p class="page-subtitle">Download the latest versions of our software packages</p>
            <div class="header-stats">
              <span class="stat-item">{{ packages.length }} packages</span>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>

    <!-- Packages List -->
    <el-container class="packages-container">
      <el-main>
        <div class="list-header">
          <el-input
              v-model="searchText"
              placeholder="Find a package..."
              :prefix-icon="Search"
              size="default"
              class="search-input"
              clearable
          />
        </div>

        <div class="packages-list">
          <div
              v-for="pkg in filteredPackages"
              :key="pkg.name"
              class="package-item"
              @click="navigateToPackage(pkg.name)"
          >
            <div class="package-info">
              <div class="package-main">
                <div class="package-icon">
                  <el-icon size="20">
                    <Box/>
                  </el-icon>
                </div>
                <div class="package-details">
                  <div class="package-name">{{ pkg.displayName }}</div>
                  <div class="package-description">{{ pkg.description || 'No description available' }}</div>
                </div>
              </div>
              <div class="package-meta">
                <el-tag size="small" type="primary" effect="plain">
                  {{ pkg.latestVersion }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>

        <el-empty
            v-if="filteredPackages.length === 0"
            description="No packages found"
            class="empty-state"
        />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.homepage {
  min-height: 100vh;
  background-color: #fafbfc;
}

.header-section {
  background: white;
  border-bottom: 1px solid #d1d9e0;
  padding: 32px 0;
}

.header-content {
  text-align: center;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  color: #24292f;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 1rem;
  color: #656d76;
  margin: 0 0 16px 0;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  font-size: 0.875rem;
  color: #656d76;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.packages-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 0;
}

.list-header {
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-end;
}

.search-input {
  width: 320px;
}

.packages-list {
  background: white;
  border: 1px solid #d1d9e0;
  border-radius: 6px;
  overflow: hidden;
}

.package-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #d8dee4;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.package-item:hover {
  background-color: #f6f8fa;
}

.package-item:last-child {
  border-bottom: none;
}

.package-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}

.package-main {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.package-icon {
  color: #656d76;
  flex-shrink: 0;
}

.package-details {
  flex: 1;
  min-width: 0;
}

.package-name {
  font-weight: 600;
  color: #0969da;
  font-size: 1rem;
  margin-bottom: 2px;
}

.package-description {
  color: #656d76;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.package-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.download-count {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #656d76;
  font-size: 0.875rem;
}

.empty-state {
  margin: 80px 0;
}

@media (max-width: 768px) {
  .header-stats {
    flex-direction: column;
    gap: 8px;
  }

  .list-header {
    justify-content: stretch;
  }

  .search-input {
    width: 100%;
  }

  .package-info {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .package-meta {
    justify-content: space-between;
  }
}
</style>
