import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: './',
    
    server: {
        port: 4345,
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
                    'Cookie': `cf_clearance=pgNIy1t_R8h60vkxlrsM7AKkbmwHsi9YxRniDU3JKJU-1783646057-1.2.1.1-N7K9TmHgvywElYRlNOqAerNfTAinRd2f0vMesR4sh2Y_2MWoHDU.zEEFOjvjpSTbh7boms05mjQio7bXA6YN1q.uycjsXUW50oURYOPDMef3cx4dKHUx.l25fWUC96perUZ3O.iOdwiHcDKQ_apq30hNcXqzYGYuj5F.Xy.GSvLd9iQs_1HFzv3PltCdOhFmQDKfolj0bAbBYHHE9VRRU13WVzIreZIA_qQqmu1PefYzCx5E3o.FuNF1qNC9_NEK2ULamfQNsKMzTaBge3KpTipXRXyMpcv.OoQmj4t4HWxtzBRc8pxc89Z0VFxFXL_9WMXU239CnQ14ocjE6rDg4kfTcExv6_QeK5cQ3FgBDT5NM.6NFV5Srzj1QSEJmGtDvQkGgF2pBMY8IAZgizlRxgC9GZe7tl4UFqQNNk3MBmRBeZGR1jrxr0gWhGkF0ZcPu822ZQ59PcqFUUonzW_okadzopQGw.ogHmE_UkDQiXVZrZXQ41qsOoJm.RuN3Yhh`,
                },
            }
        }
    },

    build: {
        assetsDir: 'assets',
    },
});
