import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

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
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36',
                    'Accept': 'application/json',
                    'Referer': 'https://pointercrate.com/',
                    'Origin': 'https://pointercrate.com',
                    'Cookie': "cf_clearance=P9GxumfvQ.dwWYxiAeQJeYD3cvgMgqbmyImMMFTyo6I-1783496232-1.2.1.1-Aq0fUF7xd5Nob5UaZ8wJeqjyTfGMptXXEq3qBq6JzpLNjisOgiqTRYCit2NOEmxpuJtevZf6X1tq3SsctppaLl6fuCX2bh_wSuVlSHHlGrubBMsldSXT66JNNVKnLaKDJd3PP3TZgTL4l08fCHVpOJMpWc24ap1Ec7vJDGKs_zwWUdP8jRC6yclLodo9GM53s.O3reUNAzP9QWtBdjV0y6Irhy2gT4sj0xI57uLdlInFKZtXxmZT4niJNoVPAodMIjhYr.1VAlczy0rDYgTpqfYY1TiZRmgy_3PzY9A7188a_ryvz9HX0Zh45nBKzKxvzmB7trhO33OXoDVgxn9ILnpneBSm_ULe06bBOYVq5AUtg8hgJZUc8X2UhbNewuZRIl.HU8PIiTwnqKVBb5WONYCas_fuywrczIYw8M2oRLp1VN5euUhmGK64oreiPDGlbjhtrho55qEOszSCpfeY1VCMwbqmtq_AT9kRGTi1c7CZJrZEf8VuyQGtfARojqrj",
                },
            }
        }
    },

    build: {
        assetsDir: 'assets',
    },
});
