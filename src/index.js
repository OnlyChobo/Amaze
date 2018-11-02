import key from 'keymaster';
import Maze from './maze';
import BFS from './bfs';
import Renderer from './renderer';
import Timer from './timer';

const [w, h] = [99, 49];
let startPoint = [h-1, 0];
let endPoint = [0, w-1];
let currPos = [h-1, 0];
let maze = new Maze(h, w);
let timer = new Timer(120000);
let renderer = new Renderer(maze.matrix, currPos, timer);
let bfs = new BFS(maze.matrix, [startPoint]);
let gameOver = false;


maze.generateMaze();
renderer.draw();
timer.start();

function frame() {
  let currentFrame = new Date();
  if (currentFrame - lastFrame >= 50) {
    if (key.isPressed('W') && currPos[0]-1 >= 0 && maze.validMove([currPos[0]-1,currPos[1]])) {
      currPos[0] --;
    }
    if (key.isPressed('S') && currPos[0]+1 < h && maze.validMove([currPos[0]+1,currPos[1]])) {
      currPos[0] ++;
    }
    if (key.isPressed('A') && currPos[1]-1 >= 0 && maze.validMove([currPos[0],currPos[1]-1])) {
      currPos[1] --;
    }
    if (key.isPressed('D') && currPos[1]+1 < w && maze.validMove([currPos[0],currPos[1]+1])) {
      currPos[1] ++;
    }
    if (key.isPressed('1')) bfs.flood();
    lastFrame = currentFrame;
  }
  renderer.draw();

  if (currPos[0] === endPoint[0] && currPos[1] === endPoint[1]) {
    console.log('win');
    gameOver = true;
  } else if (timer.time === 0) {
    console.log('game over');
    gameOver = true;
  };
  if (gameOver) {
    return;
  }
  requestAnimationFrame(frame);
}

let lastFrame = new Date();
requestAnimationFrame(frame);


let el1 = document.getElementById("newMaze");
let el2 = document.getElementById("pause");
if (el1.addEventListener)
    el1.addEventListener("click", reset, false);
if (el2.addEventListener)
    el2.addEventListener("click", pauseResume, false);


function reset() {
  maze.generateMaze();
  timer.restart();
}

function pauseResume() {
  if (timer.status()) timer.stop();
  else timer.start();
}

function startBFS() {
  bfs.flood();
  timer.stop();
}