import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Axis extends Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  // constructor(props) {
  //   super(props);

  // }

  componentDidMount() {
    console.log(this.props.width / this.props.duration);
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    return (
      <svg
        width={width}
        height={height}
      >
        Axis
      </svg>
    );
  }
}

export default Axis;
