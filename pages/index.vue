<template>
  <div class="site-main">
    <layout-dock />
    <layout-mobile-nav />
    <img
      src="~/assets/images/common/logo.png"
      alt="cover-image"
      class="site-main__cover"
    />
    <div class="site-main__subtitle">
      <div>블로그를 꾸미고 노는 걸 좋아하는</div>
      <div>프론트엔드 개발자</div>
    </div>
    <layout-footer />
  </div>
</template>

<script>
export default {
  layout: 'none',
};
</script>
