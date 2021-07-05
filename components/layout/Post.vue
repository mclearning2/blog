<template>
  <article class="post">
    <nuxt-content class="post-content__body" :document="post"></nuxt-content>
  </article>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
    },
    postList: {
      type: Array,
    },
    prevPost: {
      type: Object,
    },
    nextPost: {
      type: Object,
    },
  },
  computed: {
    category() {
      return this.$store.state.routeNames[this.post.dir];
    },
  },
};
</script>
