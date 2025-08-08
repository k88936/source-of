<template>
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
    async loadReadme() {
      // Will be implemented by generator
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
