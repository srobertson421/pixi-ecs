class Game {
  constructor({ width = 800, height = 600, mount = document.body }) {
    this.renderer = PIXI.autoDetectRenderer(width, height);
    this.stage = new PIXI.Container();
    this.systems = {};
    this.entities = {};
    this.shouldRender = true;
    this.debug = false;
    mount.appendChild(this.renderer.view);
  }

  init() {
    Object.keys(this.systems).forEach(key => {
      this.systems[key].init(this.entities, this.stage);
    });

    this.render();
  }

  addSystem({ name, system }) {
    this.systems[name] = system;
  }
  
  removeSystem(name) {
    delete this.systems[name];
  }

  getSystem(name) {
    return this.systems[name];
  }

  addEntity(entity) {
    this.entities[entity.id] = entity;
    // TODO remove this functionality from render system
    // Render system needs to loop over all entities
    this.systems['render'].addEnt(this.entities[entity.id], this.stage);
  }

  removeEntity(entityId) {
    delete this.entities[entityId];
  }

  toggleDebug() {
    this.debug = !this.debug;
  }

  render() {
    if(this.shouldRender) {
      window.requestAnimationFrame(() => this.render());

      if(this.debug) {
        console.log(`Entities: ${Object.getOwnPropertySymbols(this.entities).length}`);
      }

      this.systems['render'].draw(this.entities, this.stage, this.renderer);
    }
  }
}

export default Game;