<template>
  <article class="post-item">
    <meta-open-graph
      :title="doc.title"
      :image="doc.image"
      :description="doc.description"
      :path="doc.path"
    ></meta-open-graph>
    <div class="post-item__info">
      <h3 class="post-item__category">{{ category }}</h3>
      <h4 class="post-item__date">{{ doc.createdAt }}</h4>
    </div>
    <h1 class="post-item__title">{{ doc.title }}</h1>
    <img class="post-item__image" :src="doc.image" alt="cover-image" />

    <nuxt-content class="post-item__body" :document="doc"></nuxt-content>
  </article>
</template>

<script>
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
};
</script>
