import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		watch: {
			usePolling: true,
		},
		port: 3000,
		host: true,
	},
	build: {
		outDir: 'build',
	},
})
