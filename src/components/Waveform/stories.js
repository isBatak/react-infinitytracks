import React from 'react';
import { storiesOf } from '@storybook/react';
import { Waveform, AudioRenderProps } from 'react-infinitytracks';
import { getContext, sineWave } from '../../../stories/utils';

const context = getContext();
const sineWaveBuffer = sineWave(context);

storiesOf('Waveform', module)
  .add('canvas and .wav', () => (
    <AudioRenderProps
      render={
        ({ loading, buffer }) => !loading && [<Waveform buffer={buffer.getChannelData(0)} width={720} color="cadetblue" />, <div>numberOfChannels: {buffer.numberOfChannels}</div>]
      }
    />
  ))
  .add('canvas and sineWave', () => <Waveform buffer={sineWaveBuffer.getChannelData(0)} width={720} color="cadetblue" />)
  .add('svg and .wav', () => (
    <AudioRenderProps
      render={
        ({ loading, buffer }) => !loading && <Waveform buffer={buffer.getChannelData(0)} width={720} color="cadetblue" renderingMode={Waveform.renderMod.SVG} />
      }
    />
  ))
  .add('svg and sineWave', () => <Waveform buffer={sineWaveBuffer.getChannelData(0)} width={720} color="cadetblue" renderingMode={Waveform.renderMod.SVG} />);

