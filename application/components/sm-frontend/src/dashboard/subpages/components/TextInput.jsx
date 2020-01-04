import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextInputWrapper = styled.input.attrs({ className: "input-wrapper" })`
  border: 1px solid #cecece;
  border-radius: 3px;
  padding: 5px;
  width: 90%;
  margin: 0 auto;
  font-weight: 100;
  font-family: "Roboto", "sans-serif";

  &:focus {
    outline: none;
  }
`;

const TextInputComponent = styled.div.attrs({
  className: "input-component"
})`
  margin: 0;
  padding: 0;
  position: relative;
`;

const InputErrorText = styled.span.attrs({ className: "input-error-text" })`
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 11px;
  color: red;
`;

class TextInput extends Component {
  render() {
    const {
      value,
      onChange,
      placeholder,
      name,
      id,
      type,
      error,
      errorMsg
    } = this.props;
    return (
      <TextInputComponent>
        <TextInputWrapper
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          style={error ? { border: "1px solid red" } : {}}
          id={id}
          type={type ? type : "text"}
        />
        <InputErrorText>{errorMsg ? errorMsg : null}</InputErrorText>
      </TextInputComponent>
    );
  }
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.bool,
  errorMsg: PropTypes.string
};

export default TextInput;
