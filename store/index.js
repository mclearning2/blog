export const state = () => ({
  routeNames: null,
  dockItems: null,
});

export const mutations = {
  setRouteNames(state, routes) {
    state.routeNames = {};
    for (const route of routes) {
      state.routeNames[route.path] = route.name;
    }
  },
  setDockItems(state) {
    state.dockItems = [];
    let home = null;
    for (const route of this.$router.options.routes) {
      if (route.path === '/') {
        home = route;
        continue;
      }
      if (route.path === '/*') {
        continue;
      }
      if (route.path.split('/').length === 2) {
        state.dockItems.push(route);
      }
    }
    if (!home) {
      console.error('Home이 있어야한다.');
    }
    state.dockItems.unshift(home);
  },
};
