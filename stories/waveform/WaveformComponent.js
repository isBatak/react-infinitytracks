import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Waveform } from 'react-infinitytracks';

class WaveformComponent extends Component {
  static propTypes = {
    audioContext: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      buffer: null,
    };
  }

  async componentDidMount() {
    const res = await fetch('https://waveform.000webhostapp.com/DS_BassA140D-01.wav');
    const arrayBuffer = await res.arrayBuffer();
    const buffer = await this.props.audioContext.decodeAudioData(arrayBuffer);
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
