import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const EditInputWrapper = styled.div.attrs({ className: "edit-input-wrapper" })`
  margin: 0;
  padding: 0;
  position: relative;
`;

const EditTextInputWrapper = styled.input.attrs({ className: "input-wrapper" })`
  border: 1px solid #cecece;
  border-radius: 3px;
  padding: 5px;
  width: 90%;
  display: block;
  margin: 0 auto;
  font-weight: 100;
  font-family: "Roboto", "sans-serif";
  margin-top: 20px;

  &:focus {
    outline: none;
  }
`;

const EditInputErrorText = styled.p.attrs({ className: "input-error-text" })`
  color: red;
  position: absolute;
  top: -15px;
  left: 4.5%;
  font-size: 11px;
  margin: 0;
  padding: 0;
`;

class EditTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputContent: this.props.value
    };
  }

  onInputChange = event => {
    this.setState({
      inputContent: event.target.value
    });

    this.props.onChange(event);
  };

  render() {
    const {
      value,
      onChange,
      placeholder,
      name,
      isError,
      errorText
    } = this.props;
    return (
      <EditInputWrapper>
        <EditTextInputWrapper
          value={this.state.inputContent}
          onChange={this.onInputChange}
          placeholder={placeholder}
          name={name}
          style={isError ? { border: "1px solid red" } : {}}
        />
        <EditInputErrorText>{errorText}</EditInputErrorText>
      </EditInputWrapper>
    );
  }
}

EditTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  errorText: PropTypes.string
};

export default EditTextInput;
