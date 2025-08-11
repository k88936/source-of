import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {Generator} from './scripts/generator.js'

// Custom plugin to generate pages before build
function generatePagesPlugin() {
    return {
        name: 'generate-pages',
        buildStart: async () => {
            console.log('Generating static pages...');
            const generator = new Generator();
            await generator.generate();
        }
    }
}

// Configure base URL for subdirectory hosting
// Use VITE_BASE_URL environment variable, or default to root


// https://vite.dev/config/
export default defineConfig({
    base: "/my-collection/", // Change this to your desired base URL
    plugins: [
        generatePagesPlugin(),
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
