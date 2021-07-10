export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // github으로 배포하는 경우 base 수정 필요
  router: {
    extendRoutes(routes, resolve) {
      const path = {
        '/': 'Home',
        '/html': 'HTML',
        '/notice': '공지사항',
        '/stackoverflow': '문제해결노트',
      };

      for (const route of routes) {
        const p = route.path;
        if (p in path) {
          route.name = path[p];
        }
      }
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: `블로그 꾸미고 노는 걸 좋아하는 프론트엔드 개발자`,
    htmlAttrs: {
      lang: 'ko',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          '열심히 살면서 블로그 꾸미는 거 좋아하고 돈 많이 벌고 싶은 프론트엔드 개발자입니다.',
      },
      {
        hid: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:site_name',
        content: "MCLearning's blog",
      },
      {
        hid: 'og:title',
        content: "Welcome to MCLearning's blog",
      },
      {
        hid: 'og:description',
        content:
          '열심히 살면서 블로그 꾸미는거 좋아하고 돈 많이 벌고 싶은 프론트엔드 개발자입니다.',
      },
      {
        hid: 'og:image',
        content: 'https://mclearning-blog.com/_nuxt/img/logo.3db2992.png',
      },
      {
        hid: 'og:url',
        content: 'https://mclearning-blog.com/',
      },
      {
        name: 'naver-site-verification',
        content: 'e097e79f184f62ccc4dc2aaaca50423f9779685e',
      },
      {
        name: 'google-site-verification',
        content: 'YNvjD0t84idJqnnSOnDFSdGUWVtfSfeh8rg4_Hwnqro',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap',
      },
    ],
    script: [
      {
        src: '//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js',
      },
      {
        src: '//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js',
      },
      { src: '//cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js' },
      {
        src: '//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js',
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
  plugins: ['~/plugins/async_data.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@modules/generator',
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
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
    // https://www.npmjs.com/package/@nuxtjs/robots
    '@nuxtjs/robots',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false,
    markdown: {
      prism: {
        theme: false,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Sitemap Configuration: https://sitemap.nuxtjs.org/usage/sitemap
  sitemap: {
    hostname: 'https://mclearning-blog.com',
    gzip: true,
    generate: false,
  },
};
