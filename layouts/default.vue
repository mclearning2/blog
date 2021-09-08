<template>
  <div class="container">
    <div class="background-img">
      <img src="~/assets/images/common/bg.jpeg" alt="" />
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
  head() {
    return {
      bodyAttrs: {
        class: 'loading',
      },
    };
  },
  beforeCreate() {
    this.$store.commit('setRoutePathName', this.$router.options.routes);
    this.$store.commit('setDockItems', this.$router.options.routes);
  },
  mounted() {
    // Loading이 일정시간 안지워지면 강제로 지우기
    setTimeout(() => {
      document.querySelector('body').classList.remove('loading');
    }, 5000);

    window.onload = function () {
      document.querySelector('body').classList.remove('loading');
    };
  },
};
</script>
