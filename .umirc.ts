import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: "", component: "monaco" }
  ],
  npmClient: 'pnpm'
})