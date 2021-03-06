import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function padNumber(number) {
  return ("00" + number).slice(-2);
}

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      startTime: 0,
      elapsed: 0,
      running: false
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

        <Text style={ styles.headerText}>Stopwatch</Text>
        
        <TouchableOpacity onPress={this.reset}>
          <Text style={ styles.timeText}>{ this.getFormattedTime() }</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[ styles.startButton, { backgroundColor: this.state.running ? '#D63636' : '#15C260' } ]} 
                          onPress={this.start}>
          <Text style={styles.startButtonText}>
            { this.state.running ? 'Stop' : 'Start' }
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff'
  },
  timeText: {
    fontSize: 80,
    color: '#fff'
  },
  startButton: {
    width: 150,
    height: 150,
    backgroundColor: 'green',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  startButtonText: {
    color:'white',
    fontSize: 30
  }
});