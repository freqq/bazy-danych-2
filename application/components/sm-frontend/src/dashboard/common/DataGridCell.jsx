import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextInput from "dashboard/subpages/components/TextInput";

const DataGridCellWrapper = styled.div.attrs({ className: "data-grid-cell" })`
  border-right: 1px solid #edf2f4;
  padding: 10px;

  &:nth-child(3n) {
    border: none;
  }
`;

class DataGridCellMutable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInput: false
    };
  }

  onClick = () => {
    this.setState({ isInput: !this.state.isInput });
  };

  render() {
    const { value } = this.props;
    return (
      <DataGridCellWrapper onDoubleClick={this.onClick}>
        {this.state.isInput ? <TextInput value={value} /> : value}
      </DataGridCellWrapper>
    );
  }
}

DataGridCellMutable.propTypes = {
  value: PropTypes.string.isRequired
};

export default DataGridCellMutable;
