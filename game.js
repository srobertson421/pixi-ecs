import Game from './engine/Game.js';
import Entity from './engine/Entity.js';
import PositionComponent from './engine/components/PositionComponent.js';
import RenderComponent from './engine/components/RenderComponent.js';
import SpriteComponent from './engine/components/SpriteComponent.js';
import renderSystem from './engine/systems/renderSystem.js';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const game = new Game({
  width: 800,
  height: 600,
  mount: document.getElementById('game'),
});

game.addSystem({
  name: 'render',
  system: renderSystem,
});

const test = new Entity();
test.addComponent(new PositionComponent({ x: 0, y: 0 }));
test.addComponent(new RenderComponent());
test.addComponent(new SpriteComponent({ path: 'assets/tree.png' }));
game.addEntity(test);

game.init();

document.getElementById('debug').addEventListener('click', () => {
  game.toggleDebug();
});

document.getElementById('add-entity').addEventListener('click', () => {
  const ent = new Entity();
  ent.addComponent(new PositionComponent({ x: getRandomInt(0, 800), y: getRandomInt(0, 600) }));
  ent.addComponent(new RenderComponent());
  ent.addComponent(new SpriteComponent({ path: 'assets/tree.png' }));
  game.addEntity(ent);
});

document.getElementById('left').addEventListener('click', () => {
  test.getComponent('sprite').sprite.position.x -= 10;
});

document.getElementById('right').addEventListener('click', () => {
  test.getComponent('sprite').sprite.position.x += 10;
});

document.getElementById('toggle-render').addEventListener('click', () => {
  if(test.hasComponent('render')) {
    test.removeComponent('render');
    test.getComponent('sprite').sprite.renderable = false;
  } else {
    test.addComponent(new RenderComponent());
    test.getComponent('sprite').sprite.renderable = true;
  }
});

