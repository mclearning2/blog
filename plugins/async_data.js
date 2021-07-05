function loadImage(path) {
  let img = '';
  try {
    img = require(`~/static/post/cover_image/${path}`);
  } catch {
    img = require('~/assets/images/common/logo.png');
  }
  return img;
}

function dateFmt(date) {
  const d = new Date(date);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
}

export default ({ app }, inject) => {
  const fetchPostItem = async function (ctx, dir, slug) {
    const post = await ctx
      .$content(dir, slug, { deep: true })
      .fetch()
      .catch(() => {
        ctx.$store.router.push('/error');
      });

    post.image = loadImage(dir + '/' + slug);
    post.createdAt = dateFmt(post.createdAt);

    return post;
  };

  const fetchPostList = async function (ctx, dir) {
    const postList = await ctx
      .$content(dir, { deep: true })
      .sortBy('createdAt')
      .fetch();

    for (const p of postList) {
      p.image = loadImage(p.image);
      p.createdAt = dateFmt(p.createdAt);
    }
    for (const p of postList) {
      let summary = '';
      for (const child of p.body.children) {
        if (child.tag && child.tag === 'p') {
          summary += child.children[0].value;
        }
        if (summary.length > 100) {
          break;
        }
      }
      p.summary = summary;
    }
    return postList;
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
