import { defineConfig } from "vite";
import { params } from "@ampt/sdk";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        navigateFallbackDenylist: [/^\/api\//],
        mode: "production", // or 'development' to get logs
      },
      devOptions: {
        enabled: false, // set to true to use/debug service worker locally
      },
    }),
  ],
  server: {
    open: true,
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: params("AMPT_URL"),
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: "static",
    reportCompressedSize: true,
    rollupOptions: {
      // output: {
      //   manualChunks: {
      //     'react-icons': ['react-icons'],
      //     'next-ui': ['@nextui-org/react']
      //   }
      // },
      // lower this accomodate for Lambda's low parallel file ops
      maxParallelFileOps: 10,
    },
  },
});
