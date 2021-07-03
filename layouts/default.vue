<template>
  <div id="app">
    <layout-header />
    <layout-dock />
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
  },
};
</script>
