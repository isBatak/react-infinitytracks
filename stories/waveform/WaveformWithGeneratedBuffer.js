import React from 'react';
import PropTypes from 'prop-types';
import { Waveform } from 'react-infinitytracks';

const WaveformWithGeneratedBuffer = (props) => {
  const buffer = props.audioContext.createBuffer(1, 2024, props.audioContext.sampleRate);
  const data = buffer.getChannelData(0);

  let counter = 0;
  const increase = (Math.PI * 2) / 100;

  for (let i = 0; i < 2024; i++) {
    data[i] = (Math.sin(counter) / 2) + 0.5;
    counter += increase;
  }

  return (
    <Waveform buffer={buffer} width={720} color="cadetblue" />
  );
};

WaveformWithGeneratedBuffer.propTypes = {
  audioContext: PropTypes.object.isRequired,
};

export default WaveformWithGeneratedBuffer;
