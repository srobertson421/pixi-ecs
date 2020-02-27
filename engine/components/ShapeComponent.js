class ShapeComponent {
  constructor({
    shape = 'rectangle',
    width = 50,
    height = 50,
    color = 'red',
  }) {
    this.name = 'shape';
    this.shape = shape;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

export default ShapeComponent;