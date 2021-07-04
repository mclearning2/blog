<template>
  <page-post
    :post="post"
    :prev-post="prevPost"
    :next-post="nextPost"
  ></page-post>
</template>

<script>
export default {
  async asyncData(ctx) {
    const path = ctx.route.fullPath;
    const dir = path.split('/').slice(0, -1).join('/');
    const slug = ctx.route.params.slug;

    const post = await ctx.$fetchPostItem(ctx, dir, slug);
    const [prevPost, nextPost] = await ctx.$fetchRecentPostList(ctx, dir, slug);

    return { post, prevPost, nextPost };
  },
};
</script>
