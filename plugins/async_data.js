function dateFmt(date) {
  if (date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + d.getMonth()).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  } else {
    return '';
  }
}

export default ({ app }, inject) => {
  const fetchPostItem = async function (ctx) {
    const fetchPath = ctx.route.path.replace('/', '');
    const post = await app.store
      .$content(fetchPath)
      .fetch()
      .catch((e) => {
        console.error('fetchPostItem', e);
      });

    post.createdAt = dateFmt(post.createdAt);

    app.store.commit('setPostItem', post);
    return post;
  };

  const fetchPostList = async function (page = 0, limit = 0, path = null) {
    const route = app.context.route;

    let query = '';
    if (route.query.query) {
      query = route.query.query;
    }

    let fetchPath = path || route.path;
    fetchPath = fetchPath.split('/')[1];

    let tag = '';
    if (route.query.t) {
      tag = route.query.t;
      fetchPath = '';
    }

    let list = await app.store
      .$content(fetchPath, { deep: true })
      .only([
        'title',
        'createdAt',
        'body',
        'description',
        'dir',
        'path',
        'image',
      ])
      .sortBy('createdAt', 'desc')
      .search(query)
      .skip(page * limit);

    if (limit > 0) {
      list = list.limit(limit);
    }
    if (tag) {
      list.where({ tags: { $contains: tag } });
    }

    try {
      list = await list.fetch();

      for (const p of list) {
        if (p.createdAt) {
          p.createdAt = dateFmt(p.createdAt);
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
    let fetchPath = path || route.path;
    fetchPath = fetchPath.split('/')[1];

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
      console.warn('getTotalPostList', e);
      return 0;
    }
  };

  const getTags = async function (path) {
    const route = app.context.route;
    let fetchPath = path || route.path;
    fetchPath = fetchPath.split('/')[1];

    try {
      const res = await app.store
        .$content(fetchPath, { deep: true })
        .only(['tags'])
        .fetch();

      const tags = {};
      for (const r of res) {
        if (r.tags) {
          for (const tag of r.tags) {
            tags[tag] = 1 + (tags[tag] || 0);
          }
        }
      }

      return tags;
    } catch (e) {
      console.error('getTotalPostList', e);
      return [];
    }
  };

  inject('fetchPostItem', fetchPostItem);
  inject('fetchPostList', fetchPostList);
  inject('getTotalPostList', getTotalPostList);
  inject('getTags', getTags);
};
