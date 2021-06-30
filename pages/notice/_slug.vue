<template>
  <layout-post
    :post="post"
    :post-list="postList"
    :prev-post="prevPost"
    :next-post="nextPost"
  ></layout-post>
</template>

<script>
export default {
  async asyncData(ctx) {
    const path = ctx.route.fullPath;
    const dir = path.split('/').slice(0, -1).join('/');
    const slug = ctx.route.params.slug;

    const post = await ctx.$fetchPostItem(ctx, dir, slug);
    const postList = await ctx.$fetchPostList(ctx, dir);
    const [prevPost, nextPost] = await ctx.$fetchRecentPostList(ctx, dir, slug);

    return { post, postList, prevPost, nextPost };
  },
};
</script>
