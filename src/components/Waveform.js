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
    datum: PropTypes.instanceOf(Float32Array).isRequired,
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
      this.context2d.fillStyle = this.props.color;
      this.drawCanvas();
    }
  }

  drawCanvas() {
    const { width, height, datum } = this.props;
    const middle = height / 2;

    const step = Math.ceil(datum.length / width);

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;

      for (let j = 0; j < step; j++) {
        const value = datum[(i * step) + j];

        if (value < min) {
          min = value;
        } else if (value > max) {
          max = value;
        }

        this.context2d.fillRect(i, (1 + min) * middle, 1, Math.max(1, (max - min) * middle));
      }
    }
  }

  svgPath() {
    const { width, height, datum } = this.props;
    const middle = height / 2;

    const step = Math.ceil(datum.length / width);

    const instructions = [];

    for (let i = 0; i < width; i++) {
      const min = 1.0;
      const max = -1.0;

      for (let j = 0; j < step; j++) {
        let value = datum[(i * step) + j];

        if (value > min) {
          value = min;
        } else if (value < max) {
          value = max;
        }

        instructions.push(`${i},${(1 + value) * middle}`);
      }
    }

    return `M${instructions.join('L')}`;
  }

  render() {
    const { renderingMode, color } = this.props;

    return (
      renderingMode === this.constructor.renderMod.CANVAS
        ?
          <canvas
            ref={(element) => { this.canvas = element; }}
            width={this.props.width}
            height={this.props.height}
          />
        :
          <svg
            width={this.props.width}
            height={this.props.height}
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
