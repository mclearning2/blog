<template>
  <div class="site-main" :class="{ active: !loading }">
    <img
      src="~/static/logo.png"
      alt="cover-image"
      class="site-main__cover"
      @load="mainImgLoaded"
    />
    <div class="site-main__subtitle">
      <div>블로그를 꾸미고 노는 걸 좋아하는</div>
      <div>프론트엔드 개발자</div>
    </div>
    <div class="site-main__menu">
      <a
        v-for="item of $store.state.dockItems"
        :key="item.path"
        class="menu-item"
        :href="item.path"
      >
        <img
          alt="menu-image"
          :src="loadDockImage($store.state.routeNames[item.path])"
          class="menu-item__image"
        />
        <p class="menu-item__text">{{ $store.state.routeNames[item.path] }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'base',
  loading: {
    color: 'blue',
    height: '10px',
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
  },
  methods: {
    loadDockImage(name) {
      return require(`~/assets/images/dock/${name.toLowerCase()}.png`);
    },
    mainImgLoaded() {
      this.loading = false;
      this.$nuxt.$loading.finish();
    },
  },
};
</script>
