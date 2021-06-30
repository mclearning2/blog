export const state = () => ({
  routeNames: {},
});

export const mutations = {
  setRouteNames(state, routes) {
    for (const route of routes) {
      state.routeNames[route.path] = route.name;
    }
  },
};
