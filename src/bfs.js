import Renderer from './renderer';

class BFS {
  constructor(matrix, frontier) {
    this.matrix = matrix;
    this.frontier = frontier;
    this.h = this.matrix.length;
    this.w = this.matrix[0].length;
    this.renderer = new Renderer(this.matrix);
    this.step = 0;
    this.lastFrame = new Date();
  }

  flood() {
    let currentFrame = new Date();
    if (currentFrame - this.lastFrame > 50) {
      const newFrontier = [];
      if (this.frontier.length === 0 || this.matrix[0][this.w-1] !== 'P') {
        this.createPath();
        return;
      }
      
      for (let i = 0; i < this.frontier.length; i ++) {
        this.matrix[this.frontier[i][0]][this.frontier[i][1]] = parseInt(this.step);
        let steps = this.generateSteps(this.frontier[i]);
        for (let j = 0; j < steps.length; j ++) {
          if (this.validMove(steps[j]) && this.matrix[steps[j][0]][steps[j][1]] === 'P') {
            newFrontier.push(steps[j]);
          }
        }
      }

      this.step += 1
      this.frontier = newFrontier;
      this.lastFrame = currentFrame;
    }
    
    this.renderer.draw(this.step-1);
    let nextFlood = this.flood.bind(this);
    requestAnimationFrame(nextFlood);
  }

  createPath() {
    let currPoint = [0, this.w-1];
    let currStep = this.matrix[currPoint[0]][currPoint[1]];
    this.matrix[currPoint[0]][currPoint[1]] = 'O';
    while (currStep != 0) {
      let steps = this.generateSteps(currPoint);
      for (let i = 0; i < steps.length; i ++) {
        if (this.validMove(steps[i]) && this.matrix[steps[i][0]][steps[i][1]] === currStep-1) {
          currStep --;
          currPoint = steps[i];
          this.matrix[currPoint[0]][currPoint[1]] = 'O';
          break;
        }
      }
    }
    this.renderer.draw();
  }

  generateSteps(pos) {
    let [y, x] = [pos[0], pos[1]];
    return [[y+1, x], [y-1, x], [y, x+1], [y, x-1]];
  }

  validMove(pos) {
    let [y, x] = [pos[0], pos[1]];
    return x >= 0 && x < this.w && y >= 0 && y < this.h;
  }
}

export default BFS;
