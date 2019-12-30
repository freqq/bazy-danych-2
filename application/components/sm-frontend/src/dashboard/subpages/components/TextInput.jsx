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

class TextInput extends Component {
  render() {
    const { value, onChange, placeholder, name } = this.props;
    return (
      <TextInputWrapper
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    );
  }
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default TextInput;
