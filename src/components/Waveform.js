import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Waveform extends Component {

  static defaultProps = {
    buffer: null,
    width: 500,
    height: 100,
    zoom: 1,
    color: 'black',
    onDone: null,
  }

  static propTypes = {
    buffer: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    zoom: PropTypes.number,
    color: PropTypes.string,
    onDone: PropTypes.func,
  }

  componentDidMount() {
    const width = this.props.width * this.props.zoom;
    const middle = this.props.height / 2;

    const channelData = this.props.buffer.getChannelData(0);
    const step = Math.ceil(channelData.length / width);

    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = this.props.color;
    this.draw(width, step, middle, channelData, ctx);

    if (this.props.onDone) {
      this.props.onDone();
    }
  }

  draw(width, step, middle, data, ctx) {
    for (var i = 0; i < width; i++) {
      var min = 1.0;
      var max = -1.0;

      for (var j = 0; j < step; j++) {
        var datum = data[(i * step) + j];

        if (datum < min) {
          min = datum;
        } else if (datum > max) {
          max = datum;
        }

        ctx.fillRect(i, (1 + min) * middle, 1, Math.max(1, (max - min) * middle));
      }
    }
  }

  render() {
    return (
      <canvas
        ref={(element) => { this.canvas = element }}
        width={this.props.width * this.props.zoom}
        height={this.props.height}>
      </canvas>
    );
  }
}

export default Waveform;
