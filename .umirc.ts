import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: "", component: "monaco" },
    { path: "/condition", component: "condition" }
  ],
  npmClient: 'pnpm'
})