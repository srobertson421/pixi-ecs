const controls = {
  upIsDown: false,
  downIsDown: false,
  rightIsDown: false,
  leftIsDown: false,
}

const init = (entities, ctx) => {
  document.addEventListener('keydown', e => {
    if(e.code === 'ArrowUp') {
      controls.upIsDown = true;
    } else if(e.code === 'ArrowDown') {
      controls.downIsDown = true;
    }

    if(e.code === 'ArrowLeft') {
      controls.leftIsDown = true;
    } else if(e.code === 'ArrowRight') {
      controls.rightIsDown = true;
    }
  });

  document.addEventListener('keyup', e => {
    if(e.code === 'ArrowUp') {
      controls.upIsDown = false;
    } else if(e.code === 'ArrowDown') {
      controls.downIsDown = false;
    }

    if(e.code === 'ArrowLeft') {
      controls.leftIsDown = false;
    } else if(e.code === 'ArrowRight') {
      controls.rightIsDown = false;
    }
  });
}

const update = (entities, ctx) => {
  Object.getOwnPropertySymbols(entities).forEach(entSymbol => {
    if(entities[entSymbol].hasComponent('playerControls') && entities[entSymbol].hasComponent('position')) {
      const position = entities[entSymbol].getComponent('position');
      const playerControls = entities[entSymbol].getComponent('playerControls');
      if(controls.upIsDown) {
        position.y -= playerControls.movementSpeed;
      } else if(controls.downIsDown) {
        position.y += playerControls.movementSpeed;
      }

      if(controls.leftIsDown) {
        position.x -= playerControls.movementSpeed;
      } else if(controls.rightIsDown) {
        position.x += playerControls.movementSpeed;
      }
    }
  });
}

export default {
  init,
  update
}