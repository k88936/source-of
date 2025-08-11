import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import { packageData } from './data.js'

// Generate routes from package data
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

// Add routes for each package and version
for (const pkg of packageData.packages) {
  // Package page route
  routes.push({
    path: `/${pkg.name}`,
    name: `Package-${pkg.name}`,
    component: () => import(`./generated/${pkg.name}/index.vue`)
  })

  // Latest version redirect
  routes.push({
    path: `/${pkg.name}/latest`,
    redirect: `/${pkg.name}/${pkg.latestVersion}`
  })

  // Version page routes
  for (const version of pkg.versions) {
    routes.push({
      path: `/${pkg.name}/${version.version}`,
      name: `Version-${pkg.name}-${version.version}`,
      component: () => import(`./generated/${pkg.name}/${version.version}/index.vue`)
    })
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
