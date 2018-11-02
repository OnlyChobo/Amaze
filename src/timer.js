class Timer {
  constructor(time) {
    this.startTime = time;
    this.time = time;
    this.timer = null;
  }

  start() {
    this.timer = setInterval(() => {
      this.time -= 100;
    }, 100);
    setTimeout(() => {clearInterval(this.timer)}, this.time);
  }

  restart() {
    this.time = this.startTime;
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  status() {
    return !!this.timer;
  }
}

export default Timer;