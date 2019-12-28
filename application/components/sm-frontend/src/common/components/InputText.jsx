import React, { Component } from "react";
import styled from "styled-components";
import FloatingLabelInput from "react-floating-label-input";
import PropTypes from "prop-types";

const InputComponent = styled(FloatingLabelInput).attrs({
  className: "input-component"
})`
  width: 90%;
  margin: 15px auto;
`;

class InputText extends Component {
  render() {
    const { label, value, onChange, id } = this.props;
    return (
      <InputComponent id={id} label={label} value={value} onChange={onChange} />
    );
  }
}

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputText;
