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
            <h1 class="page-title">Source of</h1>
            <p class="page-subtitle">A collection of software</p>
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
                  <div class="package-extra">
                    <span v-if="pkg.versions && pkg.versions.length" class="package-updated">
                      Last updated: {{ new Date(pkg.versions[0].date).toLocaleDateString() }}
                    </span>
                  </div>
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
  background-color: var(--el-bg-color-page);
}

.header-section {
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  padding: 32px 0;
}

.header-content {
  text-align: center;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--el-text-color-regular);
  margin: 0 0 16px 0;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  font-size: 0.875rem;
  color: var(--el-text-color-regular);
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
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  overflow: hidden;
}

.package-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--el-border-color);
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.package-item:hover {
  background-color: var(--el-bg-color-page);
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
  color: var(--el-text-color-regular);
  flex-shrink: 0;
}

.package-details {
  flex: 1;
  min-width: 0;
}

.package-name {
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.package-extra {
  font-size: 0.875rem;
  color: var(--el-text-color-regular);
}

.package-updated {
  white-space: nowrap;
}

.package-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.empty-state {
  padding: 40px 0;
}

@media (max-width: 768px) {
  .packages-container {
    padding: 16px 0;
  }

  .search-input {
    width: 100%;
  }

  .header-stats {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
