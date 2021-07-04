<template>
  <div class="site-mobile-nav">
    <div
      class="nav-toggler-wrapper"
      :class="{ active: showNav }"
      @click="showNav = !showNav"
    >
      <div class="nav-toggler">
        <div class="hamburger ham1"></div>
        <div class="hamburger ham2"></div>
        <div class="hamburger ham3"></div>
      </div>
    </div>
    <div class="dock" :class="{ active: showNav }">
      <a
        v-for="item of $store.state.dockItems"
        :key="item.path"
        :href="item.path"
        class="dock-item"
      >
        <img
          class="dock-item__image"
          :src="
            require(`~/assets/images/dock/${$store.state.routeNames[
              item.path
            ].toLowerCase()}.png`)
          "
          alt="dock-icon"
        />
        <h2 class="dock-item__name">
          {{ $store.state.routeNames[item.path] }}
        </h2>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
    };
  },
};
</script>
