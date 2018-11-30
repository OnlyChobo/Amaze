import Timer from './timer';

class Renderer {
  constructor (matrix, pos, timer, status) {
    this.matrix = matrix;
    this.h = matrix.length;
    this.w = matrix[0].length;
    this.pos = pos;
    this.timer = timer;
    this.status = status;
  }

  draw(num) {
    let canvas = document.getElementById('canvas'); 
    let ctx = canvas.getContext('2d');
    let timeLeft = 1;
    if (this.timer) timeLeft = this.timer.time / this.timer.startTime;

    ctx.beginPath();
    ctx.rect(10, 10, 990, 490);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
    this.drawComponents(ctx, num);

    ctx.beginPath();
    ctx.rect(9, 510, 992, 40);
    ctx.fillStyle ='white';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(10, 511, 990 * timeLeft, 38);;
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.closePath();
  }

  drawRect(ctx, x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(10+x*10, 10+y*10, 10, 10);
    ctx.fill();
    ctx.filter = "filter";
    ctx.closePath();
  }

  drawComponents(ctx, num) {
    ctx.clearRect(10, 10, 990, 490);
    if (!this.status) this.drawMaze(ctx, num);
    else if (this.status.getStatus() == 'pause') this.printMessages(ctx, 'PAUSED');
    else if (this.status.getStatus() == 'new') this.printMessages(ctx, 'AMAZE');
    else if (this.status.getStatus() == 'over') this.printMessages(ctx, 'PLAY AGAIN?');
    else this.drawMaze(ctx, num);

  }

  drawMaze (ctx, num){
    let color;
    for (let i = 0; i < this.w; i ++) {
      for (let j = 0; j < this.h; j ++) {
        if (this.matrix[j][i] === 'B') color = 'black';
        else if (this.matrix[j][i] === 'P') color = 'white';
        else if (this.matrix[j][i] === 'O') color = 'yellow';
        else if (this.matrix[j][i] === num) color = '#afeeee';
        else color = '#98fb98';

        this.drawRect(ctx, i, j, color);
      }
    }
    if (this.pos) this.drawRect(ctx, this.pos[1], this.pos[0], 'red');
  }

  printMessages(ctx, message) {
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.font = 'bold 24px Roboto';
    ctx.fillText(message, 505, 255);
  }

}

export default Renderer;