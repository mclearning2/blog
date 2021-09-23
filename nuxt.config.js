export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    extendRoutes(routes, resolve) {
      const postListComp = resolve(__dirname, 'pages/blog/index.vue');
      const postComp = resolve(__dirname, 'pages/blog/_slug.vue');
      routes.length = 0;
      routes.push({
        path: '/',
        component: postListComp,
        name: '전체 보기',
      });

      routes.push({
        path: '/tag',
        component: postListComp,
      });

      function addCategory(path, name) {
        routes.push({
          path: '/' + path,
          component: postListComp,
          name,
        });
        routes.push({
          path: '/' + path + '/:year/:month/:slug',
          component: postComp,
          name: name + '-slug',
        });
      }

      addCategory('html', 'HTML');
      addCategory('css', 'CSS');
      addCategory('js', 'Javascript');
      addCategory('vuejs', 'VueJS');
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
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: "MCLearning's blog",
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: "Welcome to MCLearning's blog",
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '열심히 살면서 블로그 꾸미는거 좋아하고 돈 많이 벌고 싶은 프론트엔드 개발자입니다.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://mclearning.dev/logo.png',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://mclearning.dev/',
      },
      {
        name: 'naver-site-verification',
        content: process.env.NAVER_SITE_VERIFICATION,
      },
      {
        name: 'google-site-verification',
        content: process.env.GOOGLE_SITE_VERIFICATION,
      },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap',
      },
    ],
    script: [
      // gtag
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-VNY2TDSXKE',
      },
      // {
      //   defer: true,
      //   hid: 'adsense',
      //   src: '/adsense.js',
      // },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/reset.scss', '~/assets/scss/common.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/async_data.js', '~/plugins/gtag.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/moment',
  ],
  moment: {
    timezone: true,
    efaultTimezone: 'Asia/Seoul',
  },

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
    '@nuxtjs/dotenv',
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
  // https://stackoverflow.com/questions/51625767/how-to-make-a-compressed-js-files-with-all-pages-in-nuxt-js
  // build: {
  //   optimization: {
  //     splitChunks: {
  //       chunks: 'async',
  //     },
  //   },
  //   splitChunks: {
  //     pages: false,
  //     vendor: false,
  //     commons: false,
  //     runtime: false,
  //     layouts: false,
  //   },
  // },

  // Sitemap Configuration: https://sitemap.nuxtjs.org/usage/sitemap
  sitemap: {
    hostname: 'https://mclearning.dev',
    gzip: true,
    defaults: {
      priority: 1,
      lastmod: new Date(),
    },
  },
  generate: {
    fallback: false,
    async routes() {
      const { $content } = require('@nuxt/content');
      const files = await $content({ deep: true }).only(['path']).fetch();
      return files.map((file) => (file.path === '/' ? '/' : file.path));
    },
  },
};
