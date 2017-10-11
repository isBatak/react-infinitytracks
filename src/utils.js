export default {
  roundUpToNearest(value, multiple) {
    const remainder = value % multiple;
    return (remainder === 0) ? value : ((value + multiple) - remainder);
  },
};

