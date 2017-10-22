import PropTypes from 'prop-types';

const audioContextTypes = {
  audio: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    buffer: PropTypes.instanceOf(AudioBuffer),
  }),
};

export default audioContextTypes;
