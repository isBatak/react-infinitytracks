import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Waveform extends Component {
  static defaultProps = {
    width: 500,
    height: 100,
    zoom: 1,
    color: 'black',
    renderingMode: 'canvas',
  }

  static propTypes = {
    buffer: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    zoom: PropTypes.number,
    color: PropTypes.string,
    renderingMode: PropTypes.oneOf(['canvas', 'svg']),
  }

  componentDidMount() {
    if (this.props.renderingMode === 'canvas') {
      this.context2d = this.canvas.getContext('2d');
      this.context2d.fillStyle = this.props.color;
      this.drawCanvas();
    }
  }

  drawCanvas() {
    const width = this.props.width * this.props.zoom;
    const middle = this.props.height / 2;

    const channelData = this.props.buffer.getChannelData(0);
    const step = Math.ceil(channelData.length / width);

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;

      for (let j = 0; j < step; j++) {
        const datum = channelData[(i * step) + j];

        if (datum < min) {
          min = datum;
        } else if (datum > max) {
          max = datum;
        }

        this.context2d.fillRect(i, (1 + min) * middle, 1, Math.max(1, (max - min) * middle));
      }
    }
  }

  svgPath() {
    const width = this.props.width * this.props.zoom;
    const middle = this.props.height / 2;

    const channelData = this.props.buffer.getChannelData(0);
    const step = Math.ceil(channelData.length / width);

    const instructions = [];

    for (let i = 0; i < width; i++) {
      const min = 1.0;
      const max = -1.0;

      for (let j = 0; j < step; j++) {
        let datum = channelData[(i * step) + j];

        if (datum > min) {
          datum = min;
        } else if (datum < max) {
          datum = max;
        }

        instructions.push(`${i},${(1 + datum) * middle}`);
      }
    }

    return `M${instructions.join('L')}`;
  }

  render() {
    const { renderingMode, color } = this.props;
    return (
      renderingMode === 'canvas'
        ?
          <canvas
            ref={(element) => { this.canvas = element; }}
            width={this.props.width * this.props.zoom}
            height={this.props.height}
          />
        :
          <svg
            width={this.props.width * this.props.zoom}
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
