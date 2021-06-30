<template>
  <div id="app">
    <layout-header />
    <div class="container">
      <layout-dock />
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
