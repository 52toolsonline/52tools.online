// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mcp from 'astro-mcp';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://52tools.online',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mcp(), sitemap()]
});