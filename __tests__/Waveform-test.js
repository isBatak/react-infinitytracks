import React from 'react';
import { Waveform } from 'react-infinitytracks';
import renderer from 'react-test-renderer';

const audioCtx = new AudioContext();
const myArrayBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 3, audioCtx.sampleRate);

test('Show wavefrom', () => {
  const component = renderer.create(
    <Waveform buffer={myArrayBuffer} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
