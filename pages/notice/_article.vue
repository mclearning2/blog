<template>
  <article class="notice-page">
    <h1>{{ doc.title }}</h1>
    <nuxt-content :document="doc"></nuxt-content>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const doc = await $content(`/notice/${params.article}`).fetch();

    return { doc };
  },
};
</script>
