<template>
  <div class="video-container">
    <iframe
      :src="`https://www.youtube-nocookie.com/embed/${src}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      require: true,
    },
  },
};
</script>

<style scoped>
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  width: 100%;
  margin: 3rem auto;
}
.video-container iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 85%;
  height: 85%;
  transform: translate(-50%, -50%);
}
</style>
