export const strict = false;

export const state = () => ({
  dockItems: [],

  routePathName: {},

  post: {},
  postList: [],
  totalPostList: 0,
  postPerPage: 8,

  activeMobileMenu: false,
});

export const mutations = {
  setRoutePathName(state, routes) {
    for (const route of routes) {
      state.routePathName[route.path] = route.name;
    }
  },
  async setDockItems(state, routes) {
    state.dockItems = [];
    let route;

    for (let i = 0; i < routes.length; i++) {
      route = routes[i];
      if (route.path === '/*') {
        continue;
      }
      if (!route.name) {
        continue;
      }

      if (route.path.split('/').length <= 2) {
        const length = await this.$getTotalPostList(route.path, false);

        state.dockItems.push({
          path: route.path,
          name: route.name,
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
  toggleMobileMenu(state) {
    state.activeMobileMenu = !state.activeMobileMenu;
  },
};
