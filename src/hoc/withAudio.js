import React from 'react';

const withAudio = AudioViewComponent =>
  (props, context) => <AudioViewComponent {...props} {...context.audio} />;

export default withAudio;
