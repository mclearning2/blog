<template>
  <section class="site-post">
    <!-- Meta data(head) -->
    <meta-open-graph
      :title="post.title"
      :image="post.image ? post.image : ''"
      :description="post.description"
      :path="post.path"
    ></meta-open-graph>

    <!-- Content -->
    <article class="site-post__content">
      <div v-if="post.tags" class="tags">
        <img
          src="~/assets/images/common/tag.svg"
          alt="tag"
          class="tags__image"
        />
        <span class="tags__label">Tags :</span>

        <ul class="tags__list">
          <li v-for="t of post.tags" :key="t" class="item">
            {{ t }}
          </li>
        </ul>
      </div>

      <img
        v-if="post.image"
        class="site-post__image"
        :src="post.image"
        alt="cover-image"
      />

      <nuxt-content class="site-post__body" :document="post"></nuxt-content>
    </article>

    <!-- Comment -->
    <div class="comment layout-block">
      <script
        src="https://utteranc.es/client.js"
        repo="mclearning2/blog-comment"
        issue-term="pathname"
        theme="github-dark"
        crossorigin="anonymous"
        async
      ></script>
    </div>
  </section>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
export default {
  computed: {
    post() {
      return this.$store.state.post;
    },
  },
  mounted() {
    // for line number
    Prism.highlightAll();
  },
};
</script>
