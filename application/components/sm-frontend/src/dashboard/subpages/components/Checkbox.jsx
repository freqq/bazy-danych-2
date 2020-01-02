import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CheckboxWrapper = styled.input.attrs({
  className: "checkbox-wrapper",
  type: "checkbox"
})`
  display: block;
  margin: 7px auto;
`;

class Checkbox extends Component {
  render() {
    const { onChange, checked, name } = this.props;
    return (
      <CheckboxWrapper onChange={onChange} name={name} checked={checked} />
    );
  }
}

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired
};

export default Checkbox;
