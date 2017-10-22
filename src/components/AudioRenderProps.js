import audioContextTypes from '../utils/audioContextTypes';

const AudioRenderProps = ({ render }, { audio }) => render(audio);

AudioRenderProps.contextTypes = audioContextTypes;

export default AudioRenderProps;
