import React, { Component } from 'react';
import { Waveform } from 'react-infinitytracks';

class WaveformComponent extends Component {
  constructor() {
    super();
    this.state = {
      buffer: null,
    };
  }

  async componentDidMount() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const res = await fetch('https://waveform.000webhostapp.com/DS_BassA140D-01.wav');
    const arrayBuffer = await res.arrayBuffer();
    const buffer = await context.decodeAudioData(arrayBuffer);
    await this.setStateAsync({ buffer });
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  render() {
    return (
      this.state.buffer
        && <Waveform buffer={this.state.buffer} width={720} color="cadetblue" />
    );
  }
}

export default WaveformComponent;
