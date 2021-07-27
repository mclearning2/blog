<template>
  <header class="site-header">
    <a href="/">
      <img
        src="~/assets/images/common/logo.png"
        alt="cover"
        class="site-header__cover"
      />
    </a>
    <h2 class="site-header__title">
      블로그 꾸미는 걸 좋아하는 <span class="emphasis">프론트엔드 개발자</span>
    </h2>
    <div class="site-header__search">
      <input type="text" placeholder="Search" @keypress="search" />
      <img
        class="search-ico"
        src="~/assets/images/common/search.svg"
        alt="search"
        @click="search"
      />
    </div>
    <common-sns></common-sns>
  </header>
</template>

<script>
export default {
  methods: {
    search() {},
  },
};
</script>

<style></style>
