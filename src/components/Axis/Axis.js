import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toHHMMSS } from '../../utils/time';

class Axis extends Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.startTime = this.startTime.bind(this);
    this.endTime = this.endTime.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.start);
    // console.log(this.props.end);
  }

  startTime() {
    const { start } = this.props;
    return toHHMMSS(start);
  }

  endTime() {
    const { end } = this.props;
    return toHHMMSS(end);
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    return (
      <div
        width={width}
        height={height}
      >
        <div>
          {this.startTime()}
        </div>
        <div>
          {this.endTime()}
        </div>
      </div>
    );
  }
}

export default Axis;
