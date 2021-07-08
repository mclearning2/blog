function dateFmt(date) {
  const d = new Date(date);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
}

function setDescription(post) {
  if (!post.body) {
    return;
  }
  let desc = '';
  for (const child of post.body.children) {
    if (child.tag && child.tag === 'p') {
      desc += child.children[0].value;
    }
    if (desc.length > 100) {
      break;
    }
  }
  post.description = desc;
}

export default ({ app }, inject) => {
  const fetchPostItem = async function (ctx, dir, slug) {
    try {
      const post = await ctx
        .$content(dir, slug, { deep: true })
        .fetch()
        .catch(() => {
          ctx.$store.router.push('/error');
        });
      post.createdAt = dateFmt(post.createdAt);
      setDescription(post);
      return post;
    } catch {
      return {};
    }
  };

  const fetchPostList = async function (ctx, dir) {
    try {
      const postList = await ctx
        .$content(dir, { deep: true })
        .sortBy('createdAt')
        .fetch();
      for (const p of postList) {
        p.createdAt = dateFmt(p.createdAt);
      }
      for (const p of postList) {
        setDescription(p);
      }
      return postList;
    } catch {
      return [];
    }
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
