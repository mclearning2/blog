<template>
  <section class="post-list">
    <h2 class="post-list__title">{{ $route.name }}</h2>
    <ul class="post-list__items">
      <li v-for="p of $store.state.postList" :key="p.slug" class="post-item">
        <h3 class="post-item__category">
          <a :href="p.dir">
            {{ category(p.dir) }}
          </a>
        </h3>
        <a :href="p.path" class="post-item__info">
          <div class="text">
            <h2 class="title">{{ p.title }}</h2>
            <h3 class="summary">{{ p.description }}</h3>
            <h4 class="date">{{ p.createdAt }}</h4>
          </div>
          <div v-if="p.image" class="image">
            <img :src="p.image" alt="image" />
          </div>
        </a>
      </li>
    </ul>

    <common-pagination
      :num="pageIdx"
      :total="totalPage"
      @toFirstPage="pageIdx = 0"
      @toPrevPage="pageIdx = Math.max(pageIdx - 1, 0)"
      @toNextPage="pageIdx = Math.min(pageIdx + 1, totalPage - 1)"
      @toLastPage="pageIdx = totalPage - 1"
      @clickNum="
        (idx) => {
          pageIdx = idx;
        }
      "
    ></common-pagination>
  </section>
</template>
<script>
export default {
  asyncData(ctx) {
    ctx.$fetchPostList(0, ctx.store.state.postPerPage);
    ctx.$getTotalPostList(ctx.route.path);
  },
  data() {
    return {
      pageIdx: 0,
    };
  },
  computed: {
    postPerPage() {
      return this.$store.state.postPerPage;
    },
    totalPage() {
      return Math.ceil(
        this.$store.state.totalPostList / this.$store.state.postPerPage
      );
    },
  },
  watch: {
    pageIdx(idx) {
      this.$fetchPostList(idx, this.postPerPage);
      this.$getTotalPostList(this.$route.fullPath);
      this.scrollToPostTitle();
    },
  },
  methods: {
    scrollToPostTitle() {
      const offsetTop = document.querySelector('.post-list__title').offsetTop;
      scroll({
        top: offsetTop - 80,
        behavior: 'smooth',
      });
    },
    category(path) {
      return this.$store.state.routePathName[path];
    },
  },
};
</script>
