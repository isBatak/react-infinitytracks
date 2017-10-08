import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import WaveformComponent from './waveform/WaveformComponent';
import WaveformWithGeneratedBuffer from './waveform/WaveformWithGeneratedBuffer';

const context = new (window.AudioContext || window.webkitAudioContext)();

storiesOf('Waveform', module)
  .add('with .wav', () => <WaveformComponent audioContext={context} />)
  .add('with generated buffer', () => <WaveformWithGeneratedBuffer audioContext={context} />);
