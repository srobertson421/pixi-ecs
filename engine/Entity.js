class Entity {
  constructor() {
    this.id = Symbol();
    this.components = {};
  }

  addComponent(component) {
    this.components[component.name] = component;
  }

  removeComponent(name) {
    delete this.components[name];
  }

  getComponent(name) {
    return this.components[name];
  }

  hasComponent(name) {
    return !!this.components[name];
  }
}

export default Entity;