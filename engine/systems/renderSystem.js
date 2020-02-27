const init = (entities, ctx) => {}

const update = (entities, ctx) => {
  Object.getOwnPropertySymbols(entities).forEach(entSymbol => {
    const ent = entities[entSymbol];
    if(ent.hasComponent('render') && ent.hasComponent('position')) {
      // Render shapes
      if(ent.hasComponent('shape')) {
        const shapeComp = ent.getComponent('shape');
        const posComp = ent.getComponent('position');
        ctx.fillStyle = shapeComp.color;
        switch(shapeComp.shape) {
          case 'rectangle':
            ctx.fillRect(posComp.x, posComp.y, shapeComp.width, shapeComp.height);
          default:
            ctx.fillRect(posComp.x, posComp.y, shapeComp.width, shapeComp.height);
        }
      }

      if(ent.hasComponent('sprite')) {
        
      }
    }
  });
}

export default {
  init,
  update
}