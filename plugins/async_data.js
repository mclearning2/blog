function dateFmt(date) {
  if (date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('ko', options);
  }
}

function getSummary(body, summary = '') {
  for (const child of body.children) {
    if (child.value) {
      summary += child.value;
    }
    if (child.children) {
      summary = getSummary(child, summary);
    }
    if (summary.length >= 130) {
      break;
    }
  }
  return summary;
}

export default ({ app }, inject) => {
  const fetchPostItem = async function (ctx) {
    const fetchPath = ctx.route.fullPath.replace('/', '');
    const post = await app.store
      .$content(fetchPath)
      .fetch()
      .catch((e) => {
        console.error('fetchPostItem', e);
      });

    post.createdAt = dateFmt(post.createdAt);
    post.description = getSummary(post.body);

    app.store.commit('setPostItem', post);
    return post;
  };

  const fetchPostList = async function (page = 0, limit = 0, path = null) {
    const route = app.context.route;

    let query = '';

    if (route.query.query) {
      query = route.query.query;
    }
    let fetchPath = path || route.fullPath;
    // '/html/' => 'html'
    fetchPath = fetchPath.replace('/', '');
    fetchPath = fetchPath.replace('/', '');
    console.log('fetchPath', fetchPath);
    console.log('query', query);

    let list = await app.store
      .$content(fetchPath, { deep: true })
      .sortBy('createdAt', 'desc')
      .search(query)
      .skip(page * limit);

    if (limit > 0) {
      list = list.limit(limit);
    }

    try {
      list = await list.fetch();

      for (const p of list) {
        if (p.createdAt) {
          p.createdAt = dateFmt(p.createdAt);
        }
        if (p.body) {
          p.description = getSummary(p.body);
        }
      }
      app.store.commit('setPostList', list);
      return list;
    } catch (e) {
      console.error('fetchPostList', e);
    }
  };

  const getTotalPostList = async function (path, saveStore = true) {
    const route = app.context.route;
    let fetchPath = path || route.fullPath;

    // '/html/' => 'html'
    fetchPath = fetchPath.replace('/', '');
    fetchPath = fetchPath.replace('/', '');

    try {
      const res = await app.store
        .$content(fetchPath, { deep: true })
        .only('')
        .fetch();
      if (saveStore) {
        app.store.commit('setTotalPostList', res.length);
      }
      return res.length;
    } catch (e) {
      console.error('getTotalPostList', e);
      return 0;
    }
  };

  inject('fetchPostItem', fetchPostItem);
  inject('fetchPostList', fetchPostList);
  inject('getTotalPostList', getTotalPostList);
};
