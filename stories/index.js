import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import { Waveform } from 'react-infinitytracks';

import Utils from './utils';

const context = new (window.AudioContext || window.webkitAudioContext)();
const sineWaveBuffer = Utils.sineWave(context);
const wavBuffer = Utils.loadWavBuffer(context, 'https://waveform.000webhostapp.com/DS_BassA140D-01.wav');

storiesOf('Waveform', module)
  .add('canvas and .wav', () => <Waveform datum={wavBuffer.getChannelData(0)} width={720} color="cadetblue" />)
  .add('canvas and sineWave', () => <Waveform datum={sineWaveBuffer.getChannelData(0)} width={720} color="cadetblue" />)
  .add('svg and .wav', () => <Waveform datum={wavBuffer.getChannelData(0)} width={720} color="cadetblue" renderingMode={Waveform.renderMod.SVG} />)
  .add('svg and sineWave', () => <Waveform datum={sineWaveBuffer.getChannelData(0)} width={720} color="cadetblue" renderingMode={Waveform.renderMod.SVG} />);
