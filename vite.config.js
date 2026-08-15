import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Caminhos absolutos: com './' o navegador resolve os assets a partir da rota
  // atual (/encontros/11/assets/...), o que quebra o acesso direto a rotas internas.
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'apple-touch-icon.png',
        'brasao-logo.webp',
        'logo sem fundo.png',
        'crisma-capa.webp',
        'crisma-capa@2x.webp',
        'pomba.webp',
        'background-paper-red.webp',
        'robots.txt',
      ],
      manifest: {
        name: 'Crisma de Adultos 2026 — Paróquia Maria Mãe de Deus',
        short_name: 'Crisma 2026',
        description:
          'Site interativo dos encontros semanais de Crisma de Adultos na Paróquia Maria Mãe de Deus.',
        theme_color: '#C41230',
        background_color: '#C41230',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'pt-BR',
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache = baixado em segundo plano já no primeiro acesso. Fica só o
        // essencial (bundle, CSS, HTML e ícones do app). As imagens dos
        // encontros NÃO entram aqui: com todas no precache, quem abria o site
        // pela primeira vez baixava ~2,8 MB de dados móveis, incluindo imagens
        // de encontros que talvez nunca abrisse. Elas passaram para o
        // runtimeCaching abaixo, cacheadas conforme forem sendo vistas.
        // (As imagens da Home continuam no precache via `includeAssets`, pois
        // aparecem na primeira tela.)
        globPatterns: ['**/*.{js,css,html,woff2}', 'pwa-*.png'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        runtimeCaching: [
          {
            // Imagens dos encontros: na 1ª visualização vêm da rede e ficam
            // guardadas; nas seguintes abrem offline, sem baixar de novo.
            urlPattern: ({ request, sameOrigin }) =>
              sameOrigin && request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'crisma-imagens',
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 180,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-css' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
