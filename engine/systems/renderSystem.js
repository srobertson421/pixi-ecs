const init = (entities, stage) => {
  Object.getOwnPropertySymbols(entities).forEach(entSymbol => {
    const ent = entities[entSymbol];

    if(ent.hasComponent('sprite') && ent.hasComponent('render') && ent.hasComponent('position')) {
      ent.getComponent('sprite').texture = PIXI.Texture.from(ent.getComponent('sprite').texturePath);
      ent.getComponent('sprite').sprite = new PIXI.Sprite(ent.getComponent('sprite').texture);
      ent.getComponent('sprite').sprite.position.x = ent.getComponent('position').x;
      ent.getComponent('sprite').sprite.position.y = ent.getComponent('position').y;

      stage.addChild(ent.getComponent('sprite').sprite);
    }
  });
}

const addEnt = (ent, stage) => {
  if(ent.hasComponent('sprite') && ent.hasComponent('render') && ent.hasComponent('position')) {
    ent.getComponent('sprite').texture = PIXI.Texture.from(ent.getComponent('sprite').texturePath);
    ent.getComponent('sprite').sprite = new PIXI.Sprite(ent.getComponent('sprite').texture);
    ent.getComponent('sprite').sprite.position.x = ent.getComponent('position').x;
    ent.getComponent('sprite').sprite.position.y = ent.getComponent('position').y;

    stage.addChild(ent.getComponent('sprite').sprite);
  }
}

const draw = (entities, stage, renderer) => {
  renderer.render(stage);
}

export default {
  init,
  draw,
  addEnt,
}