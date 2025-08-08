<template>
  <div class="markdown-renderer">
    <div v-if="loading" class="loading-state">
      <el-icon class="is-loading">
        <Loading />
      </el-icon>
      <span>Loading content...</span>
    </div>
    <div v-else-if="error" class="error-state">
      <el-icon>
        <Warning />
      </el-icon>
      <span>{{ error }}</span>
    </div>
    <div v-else-if="!content" class="empty-state">
      <el-empty :description="emptyMessage" :image-size="60" />
    </div>
    <div v-else class="markdown-content" v-html="renderedContent"></div>
  </div>
</template>

<script>
import { marked } from 'marked';
import { Loading, Warning } from '@element-plus/icons-vue';

export default {
  name: 'MarkdownRenderer',
  components: {
    Loading,
    Warning
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    emptyMessage: {
      type: String,
      default: 'No content available'
    },
    sanitize: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    renderedContent() {
      if (!this.content) return '';

      try {
        // Configure marked options for GitHub-like rendering
        marked.setOptions({
          breaks: true,
          gfm: true,
          headerIds: true,
          mangle: false
        });

        return marked.parse(this.content);
      } catch (err) {
        console.error('Error parsing markdown:', err);
        return `<p>Error rendering markdown content</p>`;
      }
    }
  }
};
</script>

<style scoped>
.markdown-renderer {
  width: 100%;
}

.loading-state,
.error-state {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  color: #656d76;
  font-size: 0.875rem;
}

.error-state {
  color: #d1242f;
  background-color: #fff5f5;
  border: 1px solid #ffd6cc;
  border-radius: 6px;
}

.markdown-content {
  background: white;
  border: 1px solid #d1d9e0;
  border-radius: 6px;
  padding: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #24292f;
}

/* GitHub-style markdown content */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  color: #24292f;
}

.markdown-content :deep(h1) {
  font-size: 2em;
  border-bottom: 1px solid #d8dee4;
  padding-bottom: 0.3em;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid #d8dee4;
  padding-bottom: 0.3em;
}

.markdown-content :deep(h3) {
  font-size: 1.25em;
}

.markdown-content :deep(h4) {
  font-size: 1em;
}

.markdown-content :deep(h5) {
  font-size: 0.875em;
}

.markdown-content :deep(h6) {
  font-size: 0.85em;
  color: #656d76;
}

.markdown-content :deep(p) {
  margin-bottom: 16px;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 16px;
  padding-left: 2em;
}

.markdown-content :deep(li) {
  margin-bottom: 0.25em;
}

.markdown-content :deep(blockquote) {
  margin: 0 0 16px 0;
  padding: 0 1em;
  color: #656d76;
  border-left: 0.25em solid #d8dee4;
}

.markdown-content :deep(code) {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: #f6f8fa;
  border-radius: 6px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.markdown-content :deep(pre) {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 6px;
  margin-bottom: 16px;
}

.markdown-content :deep(pre code) {
  display: inline;
  max-width: inherit;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

.markdown-content :deep(table) {
  border-spacing: 0;
  border-collapse: collapse;
  margin-bottom: 16px;
  width: 100%;
}

.markdown-content :deep(table th),
.markdown-content :deep(table td) {
  padding: 6px 13px;
  border: 1px solid #d8dee4;
}

.markdown-content :deep(table th) {
  font-weight: 600;
  background-color: #f6f8fa;
}

.markdown-content :deep(table tr:nth-child(2n)) {
  background-color: #f6f8fa;
}

.markdown-content :deep(a) {
  color: #0969da;
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
}

.markdown-content :deep(hr) {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #d8dee4;
  border: 0;
}
</style>
