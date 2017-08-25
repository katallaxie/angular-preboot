/**
 * Custom Configuration
 *
 * You can customize almost every crucial aspect of your setup here.
 *
 * - Common Configuration
 * - Dev Configuration
 * - Production Configuration
 * - Head Tags
 * - Folders
 * - Sourcemaps
 * - Dev Server Configuration
 *
 */

// vendor
import * as PreloadWebpackPlugin from 'preload-webpack-plugin';
import * as OfflinePlugin from 'offline-plugin';

// common
export const CustomCommonConfig: CustomConfig = {
  plugins: [
    new PreloadWebpackPlugin()
  ],
  rules: [
  ]
};

// dev
export const CustomDevConfig: CustomConfig = {
  plugins: [

  ],
  rules: [

  ]
};

// production
export const CustomProdConfig: CustomConfig = {
  plugins: [
    new OfflinePlugin({
      ServiceWorker: {
        events: true
      }
    })
  ],
  rules: [

  ]
};

// head
export const CustomHeadTags: HeadTags = {
  link: [ // this will be mapted to a type of head elements (e.g. link)
    { rel: 'apple-touch-icon', sizes: '57x57', href: '/icon/apple-icon-57x57.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', href: '/icon/apple-icon-60x60.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: '/icon/apple-icon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/icon/apple-icon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: '/icon/apple-icon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/icon/apple-icon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: '/icon/apple-icon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/icon/apple-icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon/apple-icon-180x180.png' },

    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon/android-icon-192x192.png' },

    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icon/favicon-96x96.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon/favicon-16x16.png' },

    { rel: 'manifest', href: '/manifest.json' },
  ],
  meta: [
    { name: 'msapplication-TileColor', content: '#00bcd4' },
    { name: 'msapplication-TileImage', content: '/icon/ms-icon-144x144.png', '=content': true },
    { name: 'theme-color', content: '#00bcd4' },
    { name: 'description', content: 'A teeny tiny Angular template to get your next great project booted. It is powered by great ideas and Webpack 2. It does DLL, AoT, PostCss, Autoprefixer, and some other cool things.' },
  ],
  title: 'Angular Preboot'
}

// copy folders
export const CustomCopyFolders = [

];

// webpack-dev-server
export const DevServerConfig = {
  options: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    }
  },
  port: 3000
};
