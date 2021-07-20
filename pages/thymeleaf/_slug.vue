<template>
  <page-post :doc="post"></page-post>
</template>

<script>
export default {
  async asyncData(ctx) {
    const post = await ctx.$fetchPostItem(ctx);

    return { post };
  },
};
</script>
