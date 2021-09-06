<template>
  <div class="site-ad">
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-2649674681017228"
      :data-ad-slot="adSlot"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script>
export default {
  props: {
    adSlot: {
      type: String,
      require: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Adsbygoogle error is ', error);
      }
    });
  },
};
</script>
