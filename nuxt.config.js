import { sortRoutes } from '@nuxt/utils';
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // github으로 배포하는 경우 base 수정 필요
  router: {
    base: '/',
    extendRoutes(routes, resolve) {
      // Add some routes here ...
      for (const route of routes) {
        const p = route.path;
        if (p === '/notice') {
          route.name = '공지사항';
        } else if (p === '/history') {
          route.name = '블로그 역사';
        }
      }

      // and then sort them
      sortRoutes(routes);
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: `IronMin Blog`,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Iron min의 블로그입니다. 프론트엔드, 자기개발, 일상 등 일상의 기록들을 남기는 곳입니다.',
      },
      {
        name: 'og:site_name',
        content: 'Iron min Blog',
      },
      {
        name: 'og:title',
        content: 'Iron min Blog',
      },
      {
        name: 'og:keywords',
        content: 'Blog main',
      },
      {
        name: 'og:image',
        content: 'assets/images/logo.png',
      },
      {
        name: 'og:author',
        content: 'Iron min',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/reset.scss',
    '~/assets/scss/normalize.scss',
    '~/assets/scss/common.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: ['~/assets/scss/abstract/*.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
