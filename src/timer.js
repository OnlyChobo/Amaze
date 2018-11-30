class Timer {
  constructor(time) {
    this.startTime = time;
    this.time = time;
    this.timer = null;
    this.clearTime = null;
  }

  start() {
    this.timer = setInterval(() => {
      this.time -= 100;
    }, 100);
    this.clearTime = setTimeout(() => {clearInterval(this.timer)}, this.time);
  }

  restart() {
    this.stop();
    this.time = this.startTime;
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      clearTimeout(this.clearTime);
      this.timer = null;
    }
  }

  status() {
    return !!this.timer;
  }
}

export default Timer;