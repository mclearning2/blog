<template>
  <div class="site-hero">
    <!-- <common-ad v-if="postList.length > 0"></common-ad> -->
    <common-ad v-if="false"></common-ad>

    <!-- Header -->
    <header v-else-if="'title' in post" class="post-hero">
      <h3 class="post-hero__category">
        <a :href="getDir(post.dir)">
          {{ category(post.dir) }}
        </a>
      </h3>
      <h1 class="post-hero__title">
        <a :href="post.path">{{ post.title }}</a>
      </h1>
      <p class="post-hero__date">{{ post.createdAt }}</p>
    </header>
  </div>
</template>

<script>
export default {
  computed: {
    post() {
      return this.$store.state.post;
    },
    postList() {
      return this.$store.state.postList;
    },
  },
  methods: {
    getDir(path) {
      return path.split('/')[1];
    },
    category(path) {
      return this.$store.state.routePathName['/' + this.getDir(path)];
    },
  },
};
</script>

<style></style>
