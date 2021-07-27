<template>
  <page-post-list></page-post-list>
</template>

<script>
export default {
  async asyncData(ctx) {
    const postList = await ctx.$fetchPostList(ctx);
    ctx.store.commit('setPostList', postList);
  },
};
</script>
