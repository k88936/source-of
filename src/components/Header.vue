<template>
  <header class="header">
    <div class="header-container">
      <div class="header-left">
        <router-link to="/" class="logo">Source of</router-link>
      </div>
      <div class="header-right">
        <nav class="nav">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">Home</router-link>
          <a href="#" class="nav-link" @click.prevent="showAbout">About</a>
        </nav>
        <el-switch
            v-model="isDark"
            inline-prompt
            :active-icon="Moon"
            :inactive-icon="Sunny"
            @change="toggleDark"
        />
      </div>
    </div>
  </header>
</template>

<script>
import {ref, onMounted, watch} from 'vue'
import {useDark, useToggle} from '@vueuse/core'
import {useRouter, useRoute} from 'vue-router'
import {Moon, Sunny} from '@element-plus/icons-vue'

export default {
  name: 'Header',
  setup() {
    const router = useRouter()
    const route = useRoute()

    // 使用useDark hook实现主题切换逻辑
    const isDark = useDark()
    const toggleDark = useToggle(isDark)

    const showAbout = () => {
      alert('Source of - A modern static file distribution platform for software packages.')
    }

    // 监听主题变化并保存到localStorage
    watch(isDark, (newVal) => {
      localStorage.setItem('theme', newVal ? 'dark' : 'light')
    })

    // 页面加载时检查保存的主题设置
    onMounted(() => {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        isDark.value = savedTheme === 'dark'
      } else {
        // 检查系统主题偏好
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        isDark.value = prefersDark
      }
    })

    return {
      isDark,
      toggleDark,
      showAbout,
      Moon,
      Sunny,
      route
    }
  }
}
</script>

<style scoped>
.header {
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: var(--el-text-color-regular);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 0;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--el-text-color-primary);
}

.nav-link.active {
  color: var(--el-color-primary);
}
</style>