import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputComponent = styled.input.attrs({
  className: "input-component"
})`
  width: 90%;
  margin: 5px auto;
  padding: 20px;
  border: 1px solid #cecece;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

class InputText extends Component {
  render() {
    const {
      value,
      onChange,
      id,
      placeholder,
      name,
      type,
      error,
      onKeyPress
    } = this.props;
    return (
      <InputComponent
        style={error ? { border: "1px solid red" } : {}}
        name={name}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
      />
    );
  }
}

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired
};

export default InputText;
