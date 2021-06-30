function loadImage(path) {
  let img = '';
  img = require(`~/static/post/cover_image${path}.jpeg`);
  return img;
}

function dateFmt(date) {
  const d = new Date(date);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
}

export default ({ app }, inject) => {
  const fetchPostItem = async function (ctx, dir, slug) {
    const post = await ctx
      .$content(dir, slug)
      .fetch()
      .catch(() => {
        ctx.$store.router.push('/error');
      });

    post.image = loadImage(dir + '/' + slug);
    post.createdAt = dateFmt(post.createdAt);

    return post;
  };

  const fetchPostList = async function (
    ctx,
    dir,
    only = ['title', 'image', 'createdAt']
  ) {
    return await ctx
      .$content(dir, { deep: true })
      .sortBy('createdAt')
      .only(only)
      .fetch();
  };

  const fetchRecentPostList = async function (
    ctx,
    dir,
    slug,
    only = ['title']
  ) {
    const [prevPost, nextPost] = await ctx
      .$content(dir)
      .only(only)
      .sortBy('createdAt')
      .surround(slug)
      .fetch();
    return [prevPost, nextPost];
  };

  inject('fetchPostItem', fetchPostItem);
  inject('fetchPostList', fetchPostList);
  inject('fetchRecentPostList', fetchRecentPostList);
};
