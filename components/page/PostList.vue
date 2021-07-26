<template>
  <div class="site-post-list">
    <div class="header">
      <h2 class="title">{{ $route.name }}</h2>
      <ul class="mode">
        <li class="mode__item">list</li>
        <li class="mode__item">card</li>
      </ul>
    </div>

    <div v-for="p of postList" :key="p.slug" class="post-list">
      <a :href="p.path" class="post-list__item">
        <div v-if="p.image" class="image">
          <img :src="p.image" alt="image" />
        </div>
        <div class="text">
          <h2 class="title">{{ p.title }}</h2>
          <h3 class="category">{{ category(p.dir) }}</h3>
          <p class="summary">{{ p.description }}</p>
          <h4 class="date">{{ p.createdAt }}</h4>
          <div v-if="limitTags" class="tags">
            <a v-for="t of limitTags" :key="t" class="tags__item">{{ t }}</a>
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
  computed: {
    limitTags() {
      if (this.postList) {
        return this.postList.tags.slice(0, 3);
      } else {
        return [];
      }
    },
  },
  methods: {
    category(path) {
      return this.$store.state.routeNames[path];
    },
  },
};
</script>
