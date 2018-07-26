start = () => {
  this.setState({
    running: true,
    startTime: new Date() - this.state.elapsed
  });
  this.interval = setInterval(() => {
    this.setState({
      elapsed: new Date() - this.state.startTime
    });
  }, 1);
}


function padNumber(number) {
  return ("00" + number).slice(-2);
}

getFormattedTime = () => {
  let now = this.state.elapsed;
  let minutes = padNumber(Math.floor(now / (60 * 1000)));
  now = now % (60 * 1000);
  let seconds = padNumber(Math.floor(now / 1000));
  now = now % 1000;
  let milliseconds = padNumber(Math.floor(now / 10));
  return minutes + ':' + seconds + '.' + milliseconds;
}


// red: #D63636
// green: #15C260
backgroundColor: this.state.running ? '#D63636' : '#15C260'