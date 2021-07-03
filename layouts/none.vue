<template>
  <nuxt />
</template>

<script>
export default {
  created() {
    this.$store.commit('setRouteNames', this.$router.options.routes);
  },
};
</script>
