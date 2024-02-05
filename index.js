const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes.js')

function askQuestions() {
  const questions = [
    { type: 'input', name: 'text', message: 'Enter up to three characters:', validate: input => input.length <= 3 },
    { type: 'input', name: 'textColor', message: 'Enter the text color (keyword or hexadecimal):' },
    { type: 'list', name: 'shape', message: 'Choose a shape:', choices: ['circle', 'triangle', 'square'] },
    { type: 'input', name: 'shapeColor', message: 'Enter the shape color (keyword or hexadecimal):' },
  ];

  return inquirer.prompt(questions);
}

function generateSVG({ text, textColor, shape, shapeColor }) {
  let shapeObj;
  switch (shape) {
    case 'circle': shapeObj = new Circle(shapeColor); break;
    case 'triangle': shapeObj = new Triangle(shapeColor); break;
    case 'square': shapeObj = new Square(shapeColor); break;
  }

  const svgContent = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shapeObj.render()}
    <text x="150" y="125" font-family="Arial" font-size="40" fill="${textColor}" text-anchor="middle">${text}</text>
  </svg>`;

  const dateTime = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
  const filename = `logo-${dateTime}.svg`;

  const examplesDir = './examples';
  if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir);
  }

 // Save the SVG file with the unique filename in the "Examples" folder
 fs.writeFileSync(`${examplesDir}/${filename}`, svgContent);
 console.log(`Generated ${filename} in the Examples folder.`);
}

askQuestions().then(generateSVG);
