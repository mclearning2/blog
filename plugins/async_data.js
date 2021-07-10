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
  const fetchPostItem = async function (ctx) {
    const path = ctx.route.fullPath;
    const dir = path.split('/').slice(0, -1).join('/');
    const slug = ctx.route.params.slug;

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

  const fetchPostList = async function (ctx) {
    try {
      const postList = await ctx
        .$content(ctx.route.path, { deep: true })
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

  inject('fetchPostItem', fetchPostItem);
  inject('fetchPostList', fetchPostList);
};
