import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Waveform extends Component {
  static defaultProps = {
    width: 500,
    height: 100,
    color: 'black',
    renderingMode: 'canvas',
  }

  static propTypes = {
    buffer: PropTypes.instanceOf(Float32Array).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
    renderingMode: PropTypes.oneOf(['canvas', 'svg']),
  }

  static renderMod = {
    CANVAS: 'canvas',
    SVG: 'svg',
  }

  componentDidMount() {
    if (this.props.renderingMode === this.constructor.renderMod.CANVAS) {
      this.context2d = this.canvas.getContext('2d');
      this.context2d.strokeStyle = this.props.color;
      this.drawCanvas();
    }
  }

  getPeaks = (width, height, buffer) => {
    const middle = height / 2;

    const step = Math.floor(buffer.length / width) || 1;

    const peaks = [];

    for (let i = 0; i < width; i++) {
      const min = 1.0;
      const max = -1.0;

      let value = buffer[(i * step)];

      if (value > min) {
        value = min;
      } else if (value < max) {
        value = max;
      }

      peaks.push([i, Math.floor((1 + value) * middle)]);
    }

    return peaks;
  }

  drawCanvas() {
    const { width, height, buffer } = this.props;
    const peaks = this.getPeaks(width, height, buffer);

    this.context2d.beginPath();

    const start = peaks.shift();
    this.context2d.moveTo(start[0], start[1]);

    peaks.forEach((peak) => {
      this.context2d.lineTo(peak[0], peak[1]);
    });

    this.context2d.stroke();
  }

  svgPath() {
    const { width, height, buffer } = this.props;
    const peaks = this.getPeaks(width, height, buffer);
    peaks.map(peak => `${peak[0]},${peak[1]}`);
    return `M${peaks.join('L')}`;
  }

  render() {
    const {
      renderingMode,
      color,
      width,
      height,
    } = this.props;

    return (
      renderingMode === this.constructor.renderMod.CANVAS
        ?
          <canvas
            ref={(element) => { this.canvas = element; }}
            width={width}
            height={height}
          />
        :
          <svg
            width={width}
            height={height}
          >
            <path
              fill="none"
              shapeRendering="crispEdges"
              stroke={color}
              strokeWidth={1}
              style={{ opacity: 1 }}
              d={this.svgPath()}
            />
          </svg>
    );
  }
}

export default Waveform;
