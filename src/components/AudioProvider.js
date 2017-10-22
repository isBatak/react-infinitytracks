import { Component } from 'react';
import PropTypes from 'prop-types';
import audioContextTypes from '../utils/audioContextTypes';

class AudioProvider extends Component {
  static childContextTypes = audioContextTypes;

  static propTypes = {
    url: PropTypes.string.isRequired,
    audioContext: PropTypes.instanceOf(AudioContext).isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    loading: true, // eslint-disable-line react/no-unused-state
  };

  getChildContext() {
    return {
      audio: this.state,
    };
  }

  async componentDidMount() {
    const res = await fetch(this.props.url);
    try {
      const arrayBuffer = await res.arrayBuffer();
      const buffer = await this.props.audioContext.decodeAudioData(arrayBuffer);
      this.setStateAsync({
        loading: false, // eslint-disable-line react/no-unused-state
        buffer, // eslint-disable-line react/no-unused-state
      });
    } catch (error) {
      this.setStateAsync({
        loading: false, // eslint-disable-line react/no-unused-state
        error, // eslint-disable-line react/no-unused-state
      });
    }
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  render() {
    return this.props.children;
  }
}

export default AudioProvider;
