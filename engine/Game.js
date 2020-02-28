class Game {
  constructor({ width = 800, height = 600, canvas }) {
    if(!canvas) {
      throw new Error('Missing canvas reference');
    }

    this.systems = {};
    this.entities = {};
    this.shouldRender = true;
    this.debug = false;
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;

    this.canvas.width = width;
    this.canvas.height = height;
  }

  init() {}

  startSystems() {
    Object.keys(this.systems).forEach(key => {
      this.systems[key].init(this.entities, this.ctx);
    });
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
  }

  removeEntity(entityId) {
    delete this.entities[entityId];
  }

  getFirstEntity() {
    return this.entities[Object.getOwnPropertySymbols(this.entities)[0]];
  }

  getLastEntity() {
    const symbols = Object.getOwnPropertySymbols(this.entities);
    return this.entities[symbols[symbols.length - 1]];
  }

  toggleDebug() {
    this.debug = !this.debug;
  }

  render() {
    if(this.shouldRender) {
      window.requestAnimationFrame(() => this.render());

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas

      if(this.debug) {
        console.log(`Entities: ${Object.getOwnPropertySymbols(this.entities).length}`);
      }

      Object.keys(this.systems).forEach(key => {
        this.systems[key].update(this.entities, this.ctx);
      });
    }
  }
}

export default Game;