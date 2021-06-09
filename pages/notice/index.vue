<template>
  <div class="category-folder">
    <ul class="category">
      <li v-for="d of doc" :key="d.slug" class="category__item">
        <nuxt-link :to="d.path">{{ d.slug }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: 'FolderWindow',
  async asyncData({ $content, params }) {
    const doc = await $content(`/notice`, { deep: true }).fetch();

    return { doc };
  },
};
</script>
