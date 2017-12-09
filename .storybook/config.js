import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { AudioProvider } from 'react-infinitytracks';
import { getContext } from '../stories/utils';

const req = require.context('../src/components', true, /stories\.js$/);

const AudioProviderDecorator = (storyFn) => (
  <AudioProvider
    url="https://waveform.000webhostapp.com/DS_BassA140D-01.wav"
    audioContext={getContext()}
  >
    { storyFn() }
  </AudioProvider>
);

addDecorator(AudioProviderDecorator);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
