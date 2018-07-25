import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

function padNumber(number) {
  return ("00" + number).slice(-2);
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      elapsed: 0,
      startTime: 0,
      running: false,
    };
  }

  start = () => {
    if(this.state.running) {
      this.stop();
      return;
    }

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

  stop = () => {
    this.setState({
      running: false
    });
    clearInterval(this.interval);
  }

  reset = () => {
    this.setState({
      startTime: new Date(),
      elapsed: 0
    });
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Stop Watch</Text>

        <TouchableOpacity onPress={this.reset}>
          <Text style={styles.timeText}>{ this.getFormattedTime() }</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[ styles.startButton, { backgroundColor: this.state.running ? 'orange' : 'deepskyblue' } ]} 
                          onPress={this.start}>
          <Text style={styles.startButtonText}>{ this.state.running ? 'Stop' : 'Start' }</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  timeText: {
    fontSize: 85,
    fontFamily: Platform.OS == 'ios' ? 'Helvetica Neue' : 'Roboto'
  },
  startButton: {
    width: 150,
    height: 150,
    backgroundColor: 'deepskyblue',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  startButtonText: {
    color: '#fff',
    fontSize: 30
  }
});
