<template>
  <article class="post-item">
    <div class="post-item__info">
      <h3 class="post-item__category">{{ category }}</h3>
      <h4 class="post-item__date">{{ post.createdAt }}</h4>
    </div>
    <h1 class="post-item__title">{{ post.title }}</h1>

    <nuxt-content class="post-item__body" :document="post"></nuxt-content>
  </article>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: Object,
    },
    prevPost: {
      type: Object,
      default: Object,
    },
    nextPost: {
      type: Object,
      default: Object,
    },
  },
  computed: {
    category() {
      return this.$store.state.routeNames[this.post.dir];
    },
  },
};
</script>
