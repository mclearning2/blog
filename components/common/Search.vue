<template>
  <div class="search">
    <input
      v-model="query"
      type="text"
      placeholder="Search"
      class="search__input"
      @keyup="search"
    />
    <img
      class="search__ico"
      src="~/assets/images/common/search.svg"
      alt="search"
      @click="search"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    };
  },
  methods: {
    search(e) {
      const path = this.$route.fullPath;
      if (path.split('/').length <= 2) {
        this.$store.app.context.route.query.query = e.target.value;
        // Total도 실행
        this.$fetchPostList(0, this.$store.state.postPerPage);
      } else if (e.key === 'Enter') {
        const dir = path.split('/').slice(0, 2).join('/');
        this.$router.push({ path: dir, query: { query: this.query } });
      }
    },
  },
};
</script>
