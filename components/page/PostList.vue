<template>
  <div class="site-post-list">
    <div class="header">
      <h2 class="title">{{ $route.name }}</h2>
      <ul class="mode">
        <li class="mode__item"></li>
        <li class="mode__item"></li>
      </ul>
    </div>

    <div v-for="p of postList" :key="p.slug" class="post-list">
      <a :href="p.path" class="post-list__item">
        <div v-if="p.image" class="image">
          <img :src="p.image" alt="image" />
        </div>
        <div class="text">
          <h2 class="title">{{ p.title }}</h2>
          <a :href="p.dir" class="category">{{ category(p.dir) }}</a>
          <h3 class="summary">{{ p.description }}</h3>
          <h4 class="date">{{ p.createdAt }}</h4>
          <div class="tags">
            <a v-for="t of p.tags" :key="t" class="tags__item">{{ t }}</a>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    postList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    category(path) {
      return this.$store.state.routeNames[path];
    },
  },
};
</script>
