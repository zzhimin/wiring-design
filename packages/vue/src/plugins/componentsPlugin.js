export default {
  install(app) {
    const components = import.meta.glob('../components/node-setter/component/*.vue');
    Object.entries(components).forEach(([path, component]) => {
      component().then((module) => {
        app.component(module.default.name, module.default);
      });
    });
  }
};
