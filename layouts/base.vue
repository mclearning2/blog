<template>
  <div id="app">
    <nuxt v-if="!$slots.default" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('setRouteNames', this.$router.options.routes);
    this.$store.commit('setDockItems');
  },
};
</script>
