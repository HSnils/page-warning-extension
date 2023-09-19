import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import { crx, defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

const icons = {
  "16": "icons/16.png",
  "48": "icons/48.png",
  "128": "icons/128.png",
};

const manifest = defineManifest({
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  permissions: ["storage"],
  action: {
    default_popup: "index.html",
    default_icon: icons,
  },
  icons,
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content.ts"],
    },
  ],
});

export default defineConfig({
  plugins: [
    react(),
    crx({
      manifest,
    }),
  ],
});
