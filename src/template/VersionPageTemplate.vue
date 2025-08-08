<template>
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
      // Will be injected by generator
      packageInfo: {},
      versionInfo: {},
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
    downloadFile(file) {
      // Open the S3 permanent link in a new tab
      window.open(file.downloadUrl, '_blank');
    },
    async loadReadme() {
      // Will be implemented by generator
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
