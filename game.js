import Game from './engine/Game.js';
import Entity from './engine/Entity.js';
import PositionComponent from './engine/components/PositionComponent.js';
import RenderComponent from './engine/components/RenderComponent.js';
import SpriteComponent from './engine/components/SpriteComponent.js';
import ShapeComponent from './engine/components/ShapeComponent.js';
import PlayerControlsComponent from './engine/components/PlayerControlsComponent.js';
import renderSystem from './engine/systems/renderSystem.js';
import playerControlsSystem from './engine/systems/playerControlsSystem.js';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const game = new Game({
  width: window.innerWidth,
  height: window.innerHeight - 100,
  canvas: document.getElementById('game'),
});

game.addSystem({
  name: 'render',
  system: renderSystem,
});

game.addSystem({
  name: 'playerControls',
  system: playerControlsSystem,
});

game.startSystems();

game.render();

document.getElementById('debug').addEventListener('click', () => {
  game.toggleDebug();
});

document.getElementById('add-entity').addEventListener('click', () => {
  const ent = new Entity();
  ent.addComponent(new PositionComponent({ x: getRandomInt(0, window.innerWidth), y: getRandomInt(0, window.innerHeight - 100) }));
  ent.addComponent(new RenderComponent());
  ent.addComponent(new ShapeComponent({
    shape: 'rectangle',
    color: getRandomColor(),
    width: 100,
    height: 100,
  }));
  // ent.addComponent(new SpriteComponent({ path: 'assets/tree.png' }));
  if(Object.getOwnPropertySymbols(game.entities).length === 3) {
    ent.addComponent(new PlayerControlsComponent());
  }
  game.addEntity(ent);
});

document.getElementById('left').addEventListener('click', () => {
  Object.getOwnPropertySymbols(game.entities).forEach(entSymbol => {
    game.entities[entSymbol].getComponent('position').x -= 10;
  });
});

document.getElementById('right').addEventListener('click', () => {
  Object.getOwnPropertySymbols(game.entities).forEach(entSymbol => {
    game.entities[entSymbol].getComponent('position').x += 10;
  });
});

document.getElementById('up').addEventListener('click', () => {
  Object.getOwnPropertySymbols(game.entities).forEach(entSymbol => {
    game.entities[entSymbol].getComponent('position').y -= 10;
  });
});

document.getElementById('down').addEventListener('click', () => {
  Object.getOwnPropertySymbols(game.entities).forEach(entSymbol => {
    game.entities[entSymbol].getComponent('position').y += 10;
  });
});

document.getElementById('toggle-render').addEventListener('click', () => {
  Object.getOwnPropertySymbols(game.entities).forEach(entSymbol => {
    if(game.entities[entSymbol].hasComponent('render')) {
      game.entities[entSymbol].removeComponent('render');
    } else {
      game.entities[entSymbol].addComponent(new RenderComponent());
    }
  });
});

