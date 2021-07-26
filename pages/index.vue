<template>
  <page-post-list :post-list="postList"></page-post-list>
</template>

<script>
export default {
  async asyncData(ctx) {
    const postList = await ctx.$fetchPostList(ctx);

    return { postList };
  },
};
</script>
