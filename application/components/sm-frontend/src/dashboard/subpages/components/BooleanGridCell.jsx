import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const BooleanGridCellWrapper = styled.div.attrs({
  className: "boolean-grid-cell-wrapper"
})`
  border-right: 1px solid #edf2f4;
  padding: 10px;
  text-align: center;
`;

const BooleanIcon = styled.i.attrs({ className: "boolean-icon" })`
  display: block;
  margin: 0 auto;
  margin-top: 7px;
  font-size: 12px;
  color: #000;
`;

class BooleanGridCell extends Component {
  render() {
    const { value, onClick } = this.props;
    return (
      <BooleanGridCellWrapper onClick={onClick}>
        <BooleanIcon className={value ? "fas fa-check" : "fas fa-times"} />
      </BooleanGridCellWrapper>
    );
  }
}

BooleanGridCell.propTypes = {
  value: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default BooleanGridCell;
