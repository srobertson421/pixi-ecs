class SpriteComponent {
  constructor({ path = '' }) {
    this.name = 'sprite';
    this.texturePath = path;
    this.texture = null;
    this.sprite = null;
  }
}

export default SpriteComponent;