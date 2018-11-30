class Status {
  constructor() {
    this.s = 'new';
  }

  setStatus(status) {
    this.s = status;
  }

  getStatus() {
    return this.s;
  }
}

export default Status;