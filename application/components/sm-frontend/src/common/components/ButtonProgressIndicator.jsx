import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import buttonProgressAnimation from "images/button_indicator.svg";
import buttonProgressAnimationBlack from "images/button_indicator_black.svg";

const ButtonImageComponent = styled.img.attrs({
  className: "button-progress-component"
})`
  height: 10px;
`;

class ButtonProgressIndicator extends Component {
  render() {
    const { color } = this.props;
    return (
      <ButtonImageComponent
        src={
          color === "black"
            ? buttonProgressAnimationBlack
            : buttonProgressAnimation
        }
        alt="buttonProgressAnimation"
      />
    );
  }
}

ButtonProgressIndicator.prototypes = {
  color: PropTypes.string
};

export default ButtonProgressIndicator;
