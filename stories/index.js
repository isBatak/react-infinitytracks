import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import WaveformComponent from './WaveformComponent';

storiesOf('Waveform', module)
  .add('with .wav', () => <WaveformComponent />);
