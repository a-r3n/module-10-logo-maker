const { Circle, Triangle, Square } = require('./shapes.js');

describe('Shape classes', () => {
  test('Triangle render method', () => {
    const shape = new Triangle();
    shape.setColor("blue");
    expect(shape.render()).toEqual('<polygon points="150,20 250,180 50,180" fill="blue" />');
  });

  // Add tests for Circle and Square as needed
});

