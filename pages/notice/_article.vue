<template>
  <nuxt-content :document="doc" />
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const doc = await $content(params.slug || 'index').fetch();
    console.log('Doc', doc);
    console.log('Params.slug', params.slug);

    return { doc };
  },
};
</script>
