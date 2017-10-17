const utils = {
  sineWave(audioContext) {
    const buffer = audioContext.createBuffer(1, 2024, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    let counter = 0;
    const increase = (Math.PI * 2) / 100;

    for (let i = 0; i < 2024; i++) {
      data[i] = (Math.sin(counter) / 1);
      counter += increase;
    }

    return buffer;
  },

  async loadWavBuffer(audioContext, url) {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = await audioContext.decodeAudioData(arrayBuffer);
    return buffer;
  },
};

export default utils;
