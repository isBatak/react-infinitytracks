import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Waveform extends Component {
  static defaultProps = {
    width: 500,
    height: 100,
    zoom: 1,
    color: 'black',
    onDone: null,
    renderingMode: 'canvas',
  }

  static propTypes = {
    datum: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    zoom: PropTypes.number,
    color: PropTypes.string,
    onDone: PropTypes.func,
    renderingMode: PropTypes.oneOf(['canvas', 'svg']),
  }

  componentDidMount() {
    const width = this.props.width * this.props.zoom;
    const middle = this.props.height / 2;

    const channelData = this.props.datum.getChannelData(0);
    const step = Math.ceil(channelData.length / width);

    if (this.canvas) {
      this.context2d = this.canvas.getContext('2d');
      this.context2d.fillStyle = this.props.color;
      this.draw(width, step, middle, channelData);
    }

    if (this.props.onDone) {
      this.props.onDone();
    }
  }

  draw(width, step, middle, data) {
    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;

      for (let j = 0; j < step; j++) {
        const datum = data[(i * step) + j];

        if (datum < min) {
          min = datum;
        } else if (datum > max) {
          max = datum;
        }

        this.context2d.fillRect(i, (1 + min) * middle, 1, Math.max(1, (max - min) * middle));
      }
    }
  }

  path() {
    const { datum } = this.props;
    const sliceMethod = datum instanceof Float32Array ? 'subarray' : 'slice';
    const nbrSamples = datum.length;
    const duration = nbrSamples / this.params.sampleRate;
    const width = renderingContext.timeToPixel(duration);
    const samplesPerPixel = nbrSamples / width;

    if (!samplesPerPixel || datum.length < samplesPerPixel) { return; }

    let minX = Math.max(-renderingContext.offsetX, 0);
    let trackDecay = renderingContext.trackOffsetX + renderingContext.startX;
    if (trackDecay < 0) { minX = -trackDecay; }

    let maxX = minX;
    maxX += (renderingContext.width - minX < renderingContext.visibleWidth) ?
      renderingContext.width : renderingContext.visibleWidth;

    // get min/max per pixels, clamped to the visible area
    const invert = renderingContext.timeToPixel.invert;
    const sampleRate = this.params.sampleRate;
    const minMax = [];

    for (let px = minX; px < maxX; px++) {
      const startTime = invert(px);
      const startSample = startTime * sampleRate;
      const extract = datum[sliceMethod](startSample, startSample + samplesPerPixel);

      let min = Infinity;
      let max = -Infinity;

      for (let j = 0, l = extract.length; j < l; j++) {
        let sample = extract[j];
        if (sample < min) { min = sample; }
        if (sample > max) { max = sample; }
      }
      // disallow Infinity
      min = !isFinite(min) ? 0 : min;
      max = !isFinite(max) ? 0 : max;
      if (min === 0 && max === 0) { continue; }

      minMax.push([px, min, max]);
    }

    if (!minMax.length) { return; }

    const PIXEL = 0;
    const MIN = 1;
    const MAX = 2;

    const instructions = minMax.map((datum, index) => {
      const x  = datum[PIXEL];
      let y1 = Math.round(renderingContext.valueToPixel(datum[MIN]));
      let y2 = Math.round(renderingContext.valueToPixel(datum[MAX]));
      return `${x},${y1}L${x},${y2}`;
    });

    return 'M' + instructions.join('L');
  }

  render() {
    const { renderingMode, color } = this.props;
    return (
      renderingMode === 'canvas'
        ? <canvas
          ref={(element) => { this.canvas = element; }}
          width={this.props.width * this.props.zoom}
          height={this.props.height}
        />
        : <svg
          width={this.props.width * this.props.zoom}
          height={this.props.height}
        >
          <path
            fill="none"
            shapeRendering="crispEdges"
            stroke={color}
            style={{ opacity: 1 }}
            d={this.path()}
          />
        </svg>
    );
  }
}

export default Waveform;
