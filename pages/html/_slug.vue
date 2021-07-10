<template>
  <page-post :doc="post"></page-post>
</template>

<script>
export default {
  async asyncData(ctx) {
    const post = await ctx.$fetchPostItem(ctx);
    post.url = 'https://ironmin-blog-dev.netlify.app/';

    return { post };
  },
};
</script>
