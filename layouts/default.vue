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
  mounted() {
    this.$store.commit('setRouteNames', this.$router.options.routes);
    this.$store.commit('setDockItems', this.$router.options.routes);
  },
};
</script>
