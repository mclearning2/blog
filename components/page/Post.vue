<template>
  <article class="post-item">
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
  head() {
    return {
      title: this.doc.title,
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:title', property: 'og:title', content: this.doc.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.doc.description,
        },
      ],
    };
  },
  computed: {
    category() {
      return this.$store.state.routeNames[this.doc.dir];
    },
  },
};
</script>
