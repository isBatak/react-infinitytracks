import React from 'react';
import { Waveform } from 'react-infinitytracks';
import renderer from 'react-test-renderer';
import 'web-audio-test-api';

const audioContext = new AudioContext();
const buffer = audioContext.createBuffer(1, 2024, audioContext.sampleRate);
const data = buffer.getChannelData(0);

let counter = 0;
const increase = (Math.PI * 2) / 100;

for (let i = 0; i < 2024; i++) {
  data[i] = (Math.sin(counter) / 2) + 0.5;
  counter += increase;
}

test('Show waveform', () => {
  const component = renderer.create(<Waveform buffer={buffer} width={720} color="cadetblue" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
