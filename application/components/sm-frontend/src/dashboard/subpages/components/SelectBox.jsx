import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SelectBoxWrapper = styled.select.attrs({
  className: "select-box-wrapper"
})`
  width: 100%;
  display: block;
  padding: 5px;
`;

const OptionValue = styled.option.attrs({ className: "option-object" })`
  font-weight: 100;
  font-family: "Roboto", "sans-serif";
`;

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
        ? this.props.value
        : this.props.selectItems
        ? this.props.selectItems[0]
        : ""
    };
  }

  onChange = event => {
    this.setState({
      value: event.target.value
    });

    this.props.onChange(event);
  };

  render() {
    const { selectItems, name } = this.props;

    return (
      <SelectBoxWrapper
        onChange={this.onChange}
        value={this.state.value}
        name={name}
      >
        {selectItems
          ? selectItems.map(item => (
              <OptionValue value={item} key={item}>
                {item}
              </OptionValue>
            ))
          : null}
        }
      </SelectBoxWrapper>
    );
  }
}

SelectBox.propTypes = {
  selectItems: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default SelectBox;
