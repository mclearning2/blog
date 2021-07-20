<template>
  <article class="post-item">
    <meta-open-graph
      :title="doc.title"
      :image="doc.image ? doc.image : ''"
      :description="doc.description"
      :path="doc.path"
    ></meta-open-graph>
    <div class="post-item__info">
      <h3 class="post-item__category">{{ category }}</h3>
      <h4 class="post-item__date">{{ doc.createdAt }}</h4>
    </div>
    <h1 class="post-item__title">{{ doc.title }}</h1>
    <img
      v-if="doc.image"
      class="post-item__image"
      :src="doc.image"
      alt="cover-image"
    />

    <nuxt-content class="post-item__body" :document="doc"></nuxt-content>
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
  computed: {
    category() {
      return this.$store.state.routeNames[this.doc.dir];
    },
  },

  mounted() {
    // for line number
    Prism.highlightAll();
  },
};
</script>
