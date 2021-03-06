import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DataGridCellWrapper = styled.div.attrs({
  className: "data-grid-cell-mutable"
})`
  border-right: 1px solid #edf2f4;
  padding: 10px;
`;

class DataGridCellMutable extends Component {
  render() {
    const { value, onClick } = this.props;

    return <DataGridCellWrapper onClick={onClick}>{value}</DataGridCellWrapper>;
  }
}

DataGridCellMutable.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired
};

export default DataGridCellMutable;
