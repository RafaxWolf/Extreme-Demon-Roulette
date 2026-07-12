import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: './',
    
    server: {
        proxy: {
            "/pointercrate-api": {
                target: "https://pointercrate.com/",
                changeOrigin: true,
                secure: true,
                rewrite: path => path.replace(/^\/pointercrate-api/, '/api'),

                headers: {
                    'User-Agent': 'Mozilla/5.0',
                    'Accept': 'application/json',
                    'Referer': 'https://pointercrate.com/',
                    'Origin': 'https://pointercrate.com',
                },
            }
        }
    },

    build: {
        assetsDir: 'assets',
    },
});
