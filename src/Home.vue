<template>
  <div class="homepage">
    <el-header class="site-header">
      <h1>Software Download Center</h1>
      <p>Download the latest versions of our software packages</p>
    </el-header>

    <el-main>
      <el-row :gutter="20">
        <el-col 
          v-for="pkg in packages" 
          :key="pkg.name"
          :xs="24" 
          :sm="12" 
          :md="8" 
          :lg="6"
          class="package-col"
        >
          <el-card 
            :body-style="{ padding: '20px' }"
            shadow="hover"
            class="package-card"
            @click="navigateToPackage(pkg.name)"
          >
            <div class="package-info">
              <h3>{{ pkg.displayName }}</h3>
              <p class="package-description">{{ pkg.description }}</p>
              <div class="package-stats">
                <el-tag size="small" type="success">
                  Latest: {{ pkg.latestVersion }}
                </el-tag>
                <span class="download-count">
                  {{ pkg.downloadCount }} downloads
                </span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import { packageData } from './data.js';

export default {
  name: 'Home',
  data() {
    return {
      packages: packageData.packages
    };
  },
  methods: {
    navigateToPackage(packageName) {
      this.$router.push(`/${packageName}`);
    }
  }
};
</script>

<style scoped>
.homepage {
  min-height: 1000vh;
  background-color: #f5f5f5;
}

.site-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 40px 20px;
}

.site-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
  font-weight: 600;
}

.site-header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.package-col {
  margin-bottom: 20px;
}

.package-card {
  cursor: pointer;
  transition: transform 0.2s;
  height: 200px;
}

.package-card:hover {
  transform: translateY(-5px);
}

.package-info h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.package-description {
  color: #7f8c8d;
  margin-bottom: 15px;
  font-size: 0.9rem;
  line-height: 1.4;
  height: 60px;
  overflow: hidden;
}

.package-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.download-count {
  font-size: 0.8rem;
  color: #95a5a6;
}
</style>
