export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // github으로 배포하는 경우 base 수정 필요
  router: {
    extendRoutes(routes, resolve) {
      const path = {
        '/': 'Home',
        '/notice': '공지사항',
        '/vuejs': 'VueJS 정리노트',
        '/stackoverflow': '나만의 스택오버플로우',
        // '/history': '블로그 배포 노트',
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
    title: `블로그 꾸미고 노는 남자`,
    htmlAttrs: {
      lang: 'ko',
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
  content: {
    markdown: {
      prism: {
        theme: '~/static/post/css/darcula.min.css',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
