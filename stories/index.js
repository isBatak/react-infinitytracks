import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import { Waveform } from 'react-infinitytracks';

import WaveformComponent from './waveform/WaveformComponent';

import Utils from './utils';

const context = new (window.AudioContext || window.webkitAudioContext)();
const sineWaveBuffer = Utils.sineWave(context);

storiesOf('Waveform', module)
  .add('canvas and .wav', () => <WaveformComponent audioContext={context} />)
  .add('canvas and sineWave', () => <Waveform datum={sineWaveBuffer.getChannelData(0)} width={720} color="cadetblue" />)
  .add('svg and sineWave', () => <Waveform datum={sineWaveBuffer.getChannelData(0)} width={720} color="blue" renderingMode={Waveform.renderMod.CANVAS} />);
