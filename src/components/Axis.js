import React, { Component, PropTypes } from 'react';
import PropTypes from 'prop-types';

class Axis extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  getAxisLabelScale() {
    const baseSecs = 1;
    const steps = [1, 2, 5, 10, 20, 30];
    const minSpacing = 60;
    const index = 0;

    const secs;

    for (;;) {
      secs = baseSecs * steps[index];
      const pixels = view.timeToPixels(secs);

      if (pixels < minSpacing) {
        if (++index === steps.length) {
          baseSecs *= 60; // seconds -> minutes -> hours
          index = 0;
        }
      }
      else {
        break;
      }
    }

    return secs;
  };

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Axis;
