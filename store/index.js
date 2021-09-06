export const strict = false;

export const state = () => ({
  routeInfo: {
    '/': { name: '전체 보기', order: 1 },
    '/diary': { name: 'Diary', order: 2 },
    '/html': { name: 'HTML', order: 3 },
    '/css': { name: 'CSS', order: 4 },
    '/js': { name: 'Javascript', order: 5 },
    '/vuejs': { name: 'VueJS', order: 6 },
  },

  dockItems: [],

  post: {},
  postList: [],
  totalPostList: 0,
  postPerPage: 6,

  activeMobileMenu: false,
});

export const mutations = {
  async setDockItems(state, routes) {
    state.dockItems = [];
    let route;

    for (let i = 0; i < routes.length; i++) {
      route = routes[i];
      if (route.path === '/*') {
        continue;
      }

      if (route.path.split('/').length <= 2) {
        const p = route.path;
        if (p in state.routeInfo) {
          route.name = state.routeInfo[p].name;
          route.order = state.routeInfo[p].order;
        }

        const length = await this.$getTotalPostList(route.path, false);

        state.dockItems.push({
          path: route.path,
          name: route.name,
          order: route.order,
          length,
        });
      }
    }
  },
  setPostList(state, postList) {
    state.postList = postList;
  },
  setTotalPostList(state, total) {
    state.totalPostList = total;
  },
  setPostItem(state, post) {
    state.post = post;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  toggleMobileMenu(state) {
    state.activeMobileMenu = !state.activeMobileMenu;
  },
};
