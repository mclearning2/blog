<template>
  <div class="site-post-list">
    <h2 class="title">{{ $route.name }}</h2>
    <a v-for="p of postList" :key="p.slug" :href="p.path" class="post-list">
      <div class="post-list__image">
        <img :src="p.image" alt="cover-image" />
      </div>
      <div class="post-list__text">
        <h2 class="post-list__title">{{ p.title }}</h2>
        <p class="post-list__summary">{{ p.description }}</p>
        <div class="post-list__info">
          <h3 class="post-list__category">{{ category(p.dir) }}</h3>
          <h4 class="post-list__date">{{ p.createdAt }}</h4>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    postList: {
      type: Array,
      require: true,
    },
  },
  methods: {
    category(path) {
      return this.$store.state.routeNames[path];
    },
  },
};
</script>
