import React from 'react';
import { Waveform } from 'react-infinitytracks';
import renderer from 'react-test-renderer';
import 'web-audio-test-api';
import Utils from '../stories/utils';

const context = new AudioContext();
const sineWaveBuffer = Utils.sineWave(context);

test('Show waveform', () => {
  const component = renderer.create(<Waveform buffer={sineWaveBuffer} width={720} color="cadetblue" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
