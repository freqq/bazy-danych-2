import React, { Component } from "react";
import styled from "styled-components";
import Checkbox from "dashboard/subpages/components/Checkbox";
import SelectBox from "dashboard/subpages/components/SelectBox";
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
  width: 100%;
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
  left: 0;
  font-size: 11px;
  margin: 0;
  padding: 0;
`;

class EditTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputContent:
        this.props.name.toLowerCase().includes("birthday") ||
        this.props.name.toLowerCase().includes("flightdate")
          ? this.trimDate(this.props.value)
          : this.props.value
    };
  }

  camelize = string =>
    string
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");

  trimDate = date => date.split("T")[0];

  onInputChange = event => {
    this.setState({
      inputContent: event.target.value
    });

    this.props.onChange(event);
  };

  onCheckboxChange = event => {
    this.setState({
      inputContent: event.target.checked
    });

    this.props.onChange(event);
  };

  render() {
    const { placeholder, name, isError, errorText } = this.props;
    return (
      <EditInputWrapper>
        {name.toLowerCase().includes("discount") ? (
          <Checkbox
            checked={this.state.inputContent}
            onChange={this.onCheckboxChange}
            name={name}
          />
        ) : name.toLowerCase().includes("carrier") &&
          !this.props.pageTitle.toLowerCase().includes("carrier") ? (
          <SelectBox
            selectItems={this.props.carriersData}
            onChange={this.onInputChange}
            name={name}
            value={this.state.inputContent}
          />
        ) : name.toLowerCase().includes("plane") &&
          !this.props.pageTitle.toLowerCase().includes("plane") ? (
          <SelectBox
            selectItems={this.props.planesData}
            onChange={this.onInputChange}
            name={name}
            value={this.state.inputContent}
          />
        ) : name.toLowerCase().includes("client") ? (
          <SelectBox
            selectItems={this.props.clientsData}
            onChange={this.onInputChange}
            name={name}
            value={this.state.inputContent}
          />
        ) : name.toLowerCase().includes("flight") &&
          !name.toLowerCase().includes("class") ? (
          <SelectBox
            selectItems={this.props.flightsData}
            onChange={this.onInputChange}
            name={name}
            value={this.state.inputContent}
          />
        ) : name.toLowerCase().includes("ticket") ? (
          <SelectBox
            selectItems={this.props.ticketsData}
            onChange={this.onInputChange}
            name={name}
            value={this.state.inputContent}
          />
        ) : (
          <EditTextInputWrapper
            value={this.state.inputContent}
            onChange={this.onInputChange}
            placeholder={placeholder}
            name={name}
            style={isError ? { border: "1px solid red" } : {}}
          />
        )}
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
  errorText: PropTypes.string,
  pageTitle: PropTypes.string,
  planesData: PropTypes.array,
  carriersData: PropTypes.array,
  clientsData: PropTypes.array,
  flightsData: PropTypes.array,
  ticketsData: PropTypes.array
};

export default EditTextInput;
