import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ButtonProgressIndicator from "common/components/ButtonProgressIndicator";

const ButtonComponent = styled.button.attrs({
  className: "button-component"
})`
  display: block;
`;

ButtonComponent.displayName = "ButtonComponent";

class Button extends Component {
  render() {
    const { text, style, onClick, isFetching } = this.props;

    return (
      <ButtonComponent onClick={onClick} style={style}>
        {isFetching ? <ButtonProgressIndicator /> : text}
      </ButtonComponent>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
};

export default Button;
