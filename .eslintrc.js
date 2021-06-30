module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['html', 'standard', 'vue'],
  // add your custom rules here
  rules: {
    'vue/no-v-html': 0,
    'vue/no-undef': 0,
    'vue/no-unused-vars': 0,
  },
};
