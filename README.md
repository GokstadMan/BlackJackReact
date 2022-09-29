# BlackJackReact
@vitejs/plugin-react npm
The all-in-one Vite plugin for React projects.

enable Fast Refresh in development
use the automatic JSX runtime
avoid manual import React in .jsx and .tsx modules
dedupe the react and react-dom packages
use custom Babel plugins/presets
// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
