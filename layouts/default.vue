<template>
  <div class="wrap">
    <common-dock />
    <common-mobile-dock />
    <layout-header />
    <div class="content-wrap">
      <nuxt v-if="!$slots.default" />
      <slot />
    </div>
    <layout-footer />
  </div>
</template>

<script>
export default {
  method: {
    googleAnalytics() {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());

      gtag('config', 'G-VNY2TDSXKE');
    },
  },
  mounted() {
    this.$store.commit('setRouteNames', this.$router.options.routes);
    this.$store.commit('setDockItems', this.$router.options.routes);

    googleAnalytics();
  },
};
</script>
