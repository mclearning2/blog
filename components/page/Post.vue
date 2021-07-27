<template>
  <article class="site-post">
    <!-- 보이진 않지만 메타 등록 -->
    <meta-open-graph
      :title="doc.title"
      :image="doc.image ? doc.image : ''"
      :description="doc.description"
      :path="doc.path"
    ></meta-open-graph>

    <h3 class="site-post__category">{{ category(doc.dir) }}</h3>
    <h1 class="site-post__title">{{ doc.title }}</h1>
    <div class="site-post__info">
      <div class="date">{{ doc.createdAt }}</div>
      <div v-if="doc.tags" class="division"></div>
      <ul class="tags">
        <li v-for="t of doc.tags" :key="t" class="tags__item">{{ t }}</li>
      </ul>
    </div>
    <img
      v-if="doc.image"
      class="site-post__image"
      :src="doc.image"
      alt="cover-image"
    />

    <nuxt-content class="site-post__body" :document="doc"></nuxt-content>
  </article>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
export default {
  props: {
    doc: {
      type: Object,
      default: Object,
    },
  },

  mounted() {
    // for line number
    Prism.highlightAll();
  },
  methods: {
    category(path) {
      return this.$store.state.routeNames[path];
    },
  },
};
</script>
