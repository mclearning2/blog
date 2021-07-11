export const state = () => ({
  routeNames: {},
  dockItems: [],
});

export const mutations = {
  setRouteNames(state, routes) {
    for (const route of routes) {
      state.routeNames[route.path] = route.name;
    }
  },
  setDockItems(state, routes) {
    state.dockItems = [];
    let home = null;
    for (const route of routes) {
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
    state.dockItems.unshift(home);
  },
};
