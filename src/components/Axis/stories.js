import React from 'react';
import { storiesOf } from '@storybook/react';
import { Axis } from 'react-infinitytracks';
// import { getContext, sineWave } from '../../../stories/utils';

// const context = getContext();
// const sineWaveBuffer = sineWave(context);

storiesOf('Axis', module)
  .add('axis', () => (
    <Axis
      start={0}
      end={7895}
      width={720}
      height={30}
    />
  ));
