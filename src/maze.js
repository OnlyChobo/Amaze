class Maze {
  constructor(h, w) {
    this.w = w;
    this.h = h;
    this.matrix = new Array(h);
    for (let i = 0; i < h; i ++) {
      this.matrix[i] = new Array(w);
    }
    
  }

  resetMaze() {
    for (let i = 0; i < this.h; i ++) {
      for (let j = 0; j < this.w; j ++){
        this.matrix[i][j] = 'B';
      }
    }
    this.matrix[this.h-1][0] = 'P';
  }

  generateMaze() {
    const [h, w] = [this.h, this.w];
    this.resetMaze();
    let frontier = this.findFrontier(h-1, 0);
    
    while (frontier.length > 0) {
      const selected_idx = this.getRandomInt(frontier.length);
      const selected = frontier[selected_idx];
      frontier.splice(selected_idx, 1);
      if (this.matrix[selected[0]][selected[1]] == 'P') continue;
      const newPath = this.connectFrontier(selected[0], selected[1]);
      if (newPath) {
        this.matrix[selected[0]][selected[1]] = 'P';
        this.matrix[newPath[0]][newPath[1]] = 'P';
        frontier = frontier.concat(this.findFrontier(selected[0], selected[1]));
      } else {
        continue;
      }
    }
  }

  findFrontier(y, x) {
    const frontier = [];
    const [h, w] = [this.h, this.w];
    if (x + 2 < w) frontier.push([y, x + 2]);
    if (x - 2 >= 0) frontier.push([y, x - 2]);
    if (y + 2 < h) frontier.push([y + 2, x]);
    if (y - 2 >= 0) frontier.push([y - 2, x]);
    return frontier;
  }
  
  connectFrontier(y, x) {
    const frontier = [];
    const [h, w] = [this.h, this.w];
    if (x + 2 < w && this.matrix[y][x+2] == 'P' && this.matrix[y][x+1] == 'B') {
      frontier.push([y, x + 1]);
    }
    if (x - 2 >= 0 && this.matrix[y][x-2] == 'P' && this.matrix[y][x-1] == 'B') {
      frontier.push([y, x - 1]);
    }
    if (y + 2 < h && this.matrix[y+2][x] == 'P' && this.matrix[y+1][x] == 'B') {
      frontier.push([y + 1, x]);
    }
    if (y - 2 >= 0 && this.matrix[y-2][x] == 'P' && this.matrix[y-1][x] == 'B') {
      frontier.push([y - 1, x]);
    }
    if (frontier.length === 0) {
      return null;
    } else {
      return frontier[this.getRandomInt(frontier.length)];
    }
  }

  validMove(pos) {
    const [y, x] = [pos[0], pos[1]];
    return this.matrix[y][x] === 'P';
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

export default Maze;