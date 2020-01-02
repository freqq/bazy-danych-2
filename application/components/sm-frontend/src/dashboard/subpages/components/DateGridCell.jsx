import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DateGricCell = styled.div.attrs({
  className: "date-grid-cell-wrapper"
})`
  border-right: 1px solid #edf2f4;
  padding: 10px;
`;

class DateGridCell extends Component {
  trimDate = date => date.split("T")[0];

  render() {
    const { value, onClick } = this.props;
    return (
      <DateGricCell onClick={onClick}>{this.trimDate(value)}</DateGricCell>
    );
  }
}

DateGridCell.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DateGridCell;
