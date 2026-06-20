import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'

import { cloudflare } from "@cloudflare/vite-plugin";

const config = defineConfig({
  plugins: [contentCollections(), viteTsConfigPaths({
    projects: ['./tsconfig.json'],
  }), tailwindcss(), tanstackStart(), viteReact(), cloudflare({
    viteEnvironment: {
      name: "ssr"
    }
  })],
})

export default config