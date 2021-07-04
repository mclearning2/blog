<template>
  <div id="app">
    <layout-header />
    <layout-dock />
    <layout-mobile-nav />
    <div class="site-content">
      <nuxt v-if="!$slots.default" />
      <slot />
    </div>
    <layout-footer />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('setRouteNames', this.$router.options.routes);
    this.$store.commit('setDockItems');
    this.$store.commit('setDockItems');
  },
};
</script>
