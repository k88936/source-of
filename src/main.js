import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import routes from '~pages';
import 'element-plus/theme-chalk/dark/css-vars.css'
import {ViteSSG} from "vite-ssg";

import Home from './Home.vue'
routes.push({
  path: '/',
  component: Home
})


export const createApp = ViteSSG(
    // the root component
    App,
    // vue-router options
    { 
      routes,
      base: import.meta.env.BASE_URL
    },
    // function to have custom setups
    ({ app, router, routes, isClient, initialState }) => {
        // install plugins etc.
        app.use(ElementPlus)
    },
)