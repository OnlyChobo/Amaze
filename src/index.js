import key from 'keymaster';
import Maze from './maze';
import BFS from './bfs';
import Renderer from './renderer';
import Timer from './timer';
import Status from './status';

const [w, h] = [99, 49];
let startPoint = [h-1, 0];
let endPoint = [0, w-1];
let currPos = [h-1, 0];
let maze = new Maze(h, w);
let status = new Status();
let timer = new Timer(90000);
let renderer = new Renderer(maze.matrix, currPos, timer, status);
let bfs = new BFS(maze.matrix, [startPoint]);
let gameOver = false;

renderer.draw();
// timer.start();


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
    lastFrame = currentFrame;
  }

  if (currPos[0] === endPoint[0] && currPos[1] === endPoint[1]) {
    console.log('win');
    status.setStatus('over');
    gameOver = true;
  } else if (timer.time === 0) {
    console.log('game over');
    status.setStatus('over');
    gameOver = true;
  };

  renderer.draw();

  if (gameOver) {
    return;
  }
  requestAnimationFrame(frame);
}

let lastFrame = new Date();
requestAnimationFrame(frame);



let el1 = document.getElementById("newMaze");
let el2 = document.getElementById("pause");
let el3 = document.getElementById("bfs");

el2.disabled = true;
el3.disabled = true;
if (el1.addEventListener)
  el1.addEventListener("click", reset, false);
if (el2.addEventListener)
  el2.addEventListener("click", pauseResume, false);
if (el3.addEventListener)
  el3.addEventListener("click", startBFS, false);


function reset() {
  gameOver = false;
  maze.generateMaze();
  bfs = new BFS(maze.matrix, [startPoint]);
  timer.restart();
  timer.start();
  status.setStatus('play');
  el2.disabled = false;
  el3.disabled = false;
  requestAnimationFrame(frame);
}

function pauseResume() {
  if (status.getStatus() != 'pause') {
    timer.stop();
    status.setStatus('pause');
  } else {
    timer.start();
    status.setStatus('play');
  }
}

function startBFS() {
  el1.disabled = true;
  el2.disabled = true;
  el3.disabled = true;
  bfs.flood();
  timer.stop();
  status.setStatus('play');
}