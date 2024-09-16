import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
      "@common": fileURLToPath(new URL("./src/common", import.meta.url)),
    },
  },
});
