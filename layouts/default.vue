<template>
  <Base>
    <layout-header />
    <layout-dock />
    <layout-mobile-nav />
    <div class="site-content">
      <nuxt v-if="!$slots.default" />
    </div>
    <layout-footer />
  </Base>
</template>

<script>
import Base from '~/layouts/base.vue';
export default {
  components: {
    Base,
  },
};
</script>
