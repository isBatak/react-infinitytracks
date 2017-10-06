import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// import React from 'react';
// import Waveform from './Waveform';

// var request = new XMLHttpRequest();
// request.open('GET', 'https://waveform.000webhostapp.com/DS_BassA140D-01.wav', true);
// request.responseType = 'arraybuffer';

// request.addEventListener('load', function () {
//   var context = new (window.AudioContext || window.webkitAudioContext)();

//   context.decodeAudioData(request.response, function (buffer) {
//     ReactDOM.render(
//       <Waveform buffer={buffer} width={720} color="cadetblue" />,
//       document.querySelector('#app')
//     );
//   });
// });

// request.send();
