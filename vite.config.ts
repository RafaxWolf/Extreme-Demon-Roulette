import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: './',
    
    server: {
        port: 3000,
        proxy: {
            "/pointercrate-api": {
                target: "https://pointercrate.com/",
                changeOrigin: true,
                secure: true,
                rewrite: path => path.replace(/^\/pointercrate-api/, '/api'),

                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36',
                    'Accept': 'application/json',
                    'Referer': 'https://pointercrate.com/',
                    'Origin': 'https://pointercrate.com',
                    'Cookie': `${process.env.COOKIE}`,
                },
            }
        }
    },

    build: {
        assetsDir: 'assets',
    },
});
