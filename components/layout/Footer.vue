<template>
  <footer class="site-footer">
    <div class="site-footer__ad">
      <common-ad :ad-slot="'8640324302'"></common-ad>
    </div>
    <div class="blog-info">
      <p class="blog-info__copy-right">
        Copyright © mclearning.dev 2021-{{ todayYear }}. All Rights Reserved.
      </p>
      <common-sns class="blog-info__sns"></common-sns>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    todayYear() {
      const today = new Date();
      return today.getFullYear();
    },
  },
};
</script>
