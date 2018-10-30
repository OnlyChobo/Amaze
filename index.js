class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getFrontier(upperX, upperY) {
    const arr = []
    if (this.x - 1 >= 0) arr.push(new Coordinate(this.x - 1, this.y));
    if (this.x + 1 <= upperX) arr.push(new Coordinate(this.x + 1, this.y));
    if (this.y - 1 >= 0) arr.push(new Coordinate(this.x, this.y - 1));
    if (this.y + 1 <= upperY) arr.push(new Coordinate(this.x, this.y + 1));
    return arr;
  }

  equal(otherCoordinate) {
    return (this.x === otherCoordinate.x && this.y === otherCoordinate.y);
  }
}

class Prims {
  constructor(ctx, upperX, upperY) {
    this.ctx  = ctx;
    this.upperX = upperX;
    this.upperY = upperY;
    this.coordinate = new Coordinate(0, 0);
    this.frontier = []
    this.maze = []
  }

  start() {
    let i = 0;
    while (this.frontier.length > 0 || this.maze.length === 0) {
      this.step();
      let newMaze = this.getRandomInt(this.frontier.length);
      this.coordinate = this.frontier[newMaze];
      this.frontier.splice(newMaze, 1);
      i ++;
    }
  }

  step() {
    let newFrontier = this.coordinate.getFrontier(this.upperX, this.upperY);
    let sum = 0;
    for (let i = 0; i < newFrontier.length; i ++){
      for (let j = 0; j < this.maze.length; j ++) {
        if (this.maze[j].equal(newFrontier[i])) {
          sum ++;
        }
      }
    }
    if (sum > 1) return;

    this.drawRect(this.ctx);
    this.maze.push(this.coordinate);
    
    for (let i = 0; i < newFrontier.length; i ++){
      let flag = false;
      for (let j = 0; j < this.frontier.length; j ++) {
        if (this.frontier[j].equal(newFrontier[i])) {
          flag = true;
          break;
        }
      }
      for (let j = 0; j < this.maze.length; j ++) {
        if (this.maze[j].equal(newFrontier[i])) {
          flag = true;
          break;
        }
      }
      if (!flag) this.frontier.push(newFrontier[i]);
    }
  }

  drawRect(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(100+this.coordinate.x*10, 100+this.coordinate.y*10, 10, 10);
    ctx.fill();
    ctx.closePath();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

var canvas = document.getElementById('canvas'); 
var ctx = canvas.getContext('2d'); 

ctx.fillStyle = "white"; 
ctx.rect(100,100,900,900);
ctx.fill();
ctx.lineWidth = 2;
ctx.strokeStyle = 'black';
ctx.stroke();

const prims = new Prims(ctx, 100, 100);
prims.start();

