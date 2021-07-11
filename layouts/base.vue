<template>
  <div id="app">
    <nuxt v-if="!$slots.default" />
    <slot></slot>
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
