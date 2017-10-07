import React, { Component } from 'react';
import { Waveform } from 'react-infinitytracks';

class WaveformComponent extends Component {
  constructor() {
    super();
    this.state = {
      buffer: null,
    };
  }

  componentDidMount() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://waveform.000webhostapp.com/DS_BassA140D-01.wav', true);
    request.responseType = 'arraybuffer';

    request.addEventListener('load', () => {
      const context = new (window.AudioContext || window.webkitAudioContext)();

      context.decodeAudioData(request.response, (buffer) => {
        this.setState({ buffer });
      });
    });

    request.send();
  }

  render() {
    return (
      this.state.buffer !== null
        ? <Waveform buffer={ this.state.buffer } width={ 720 } color="cadetblue" />
        : null
    );
  }
}

export default WaveformComponent;
