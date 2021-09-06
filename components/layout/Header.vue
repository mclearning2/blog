<template>
  <header class="site-header">
    <a href="/" class="site-header__home-link">
      <img src="~/assets/images/common/logo.png" alt="logo" />
    </a>

    <common-search></common-search>
    <common-navigation></common-navigation>

    <common-hamburger-btn></common-hamburger-btn>
  </header>
</template>

<script>
export default {
  data() {
    return {
      scrollStart: false,
    };
  },
};
</script>
