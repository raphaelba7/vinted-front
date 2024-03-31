import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the styles

class TwoRangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [25, 75], // Initial range values
    };
  }

  handleSliderChange = (values) => {
    // Ensure the ranges do not cross
    if (values[0] >= values[1]) {
      return;
    }
    this.setState({ values });
  };

  render() {
    return (
      <div style={{ width: "50%", margin: "20px auto" }}>
        <Slider.Range
          min={0}
          max={100}
          step={0.1}
          allowCross={false} // Prevent handles from crossing
          value={this.state.values}
          onChange={this.handleSliderChange}
        />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          Range 1: {this.state.values[0]} - Range 2: {this.state.values[1]}
        </div>
      </div>
    );
  }
}

export default TwoRangeSlider;
