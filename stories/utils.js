const utils = {
  sineWave(audioContext, length = 2024) {
    const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    let counter = 0;
    const increase = (Math.PI * 2) / 100;

    for (let i = 0; i < length; i++) {
      data[i] = (Math.sin(counter) / 1);
      counter += increase;
    }

    return buffer;
  },
};

export default utils;
