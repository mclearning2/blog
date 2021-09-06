<template>
  <button
    type="button"
    class="hamburger-btn"
    :class="{ active: $store.state.activeMobileMenu }"
    @click="clickBtn"
  >
    <div class="hamburger-wrap">
      <div class="hamburger ham1"></div>
      <div class="hamburger ham2"></div>
      <div class="hamburger ham3"></div>
    </div>
  </button>
</template>

<script>
export default {
  methods: {
    clickBtn() {
      if (this.$store.state.activeMobileMenu) {
        document.querySelector('body').style.overflow = 'auto';
      } else {
        document.querySelector('body').style.overflow = 'hidden';
      }

      this.$store.commit('toggleMobileMenu');
    },
  },
};
</script>
