<template>
  <div class="container">
    <div class="background-img">
      <img src="~/assets/images/common/bg.png" alt="" />
      <div class="linear-grad"></div>
    </div>

    <layout-mobile-menu></layout-mobile-menu>

    <div class="wrap">
      <layout-header />

      <layout-hero></layout-hero>

      <main class="wrap__main">
        <nuxt />
      </main>

      <layout-sidebar></layout-sidebar>

      <layout-footer />
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.commit('setRoutePathName', this.$router.options.routes);
    this.$store.commit('setDockItems', this.$router.options.routes);
  },
};
</script>
