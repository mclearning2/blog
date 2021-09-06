<template>
  <page-post-list></page-post-list>
</template>

<script>
export default {
  asyncData(ctx) {
    ctx.$fetchPostList(0, ctx.store.state.postPerPage);
  },
};
</script>
