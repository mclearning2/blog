<template>
  <default>
    <article class="content-window">
      <Nuxt />
    </article>
  </default>
</template>

<script>
import Default from '~/layouts/default.vue';
export default {
  components: {
    Default,
  },
  async asyncData({ $content, params }) {
    const doc = await $content(params.slug || 'index').fetch();

    return { doc };
  },
};
</script>
