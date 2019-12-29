import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DataGridWrapper = styled.ul.attrs({ className: "data-grid-wrapper" })`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 100%;
`;

const DataGridRow = styled.li.attrs({ className: "data-grid-row" })`
  margin: 0;
  border-top: 1px solid #edf2f4;
  border-bottom: 1px solid #edf2f4;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto;
  grid-auto-flow: column;
  font-size: 11px;
  transition: 0.2s;

  &:nth-child(1) {
    background: #f6f8f9;
    font-size: 15px;
  }
`;

const DataGridCell = styled.div.attrs({ className: "data-grid-cell" })`
  border-right: 1px solid #edf2f4;
  padding: 10px;

  &:nth-child(3n) {
    border: none;
  }
`;

const NoData = styled.p.attrs({ className: "no-data" })`
  padding: 10px;
  font-size: 12px;
  text-align: center;
`;

const ActionButton = styled.i.attrs({ className: "action-button" })`
  padding: 5px 8px;
  border-radius: 50%;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    background: #edf2f4;
  }
`;

class DataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <DataGridWrapper>
        <DataGridRow>
          {this.props.columnHeaders.map(item => (
            <DataGridCell>{item}</DataGridCell>
          ))}
        </DataGridRow>
        {this.props.rowData.length == 0 ? (
          <NoData>No data avaible to fetch from server.</NoData>
        ) : (
          this.props.rowData.map(item => (
            <DataGridRow>
              <DataGridCell>{item.planeModel}</DataGridCell>
              <DataGridCell>{item.seatsCount}</DataGridCell>
              <DataGridCell>
                <ActionButton
                  className="far fa-trash-alt"
                  onClick={() => this.props.onDelete(item.id)}
                />
              </DataGridCell>
            </DataGridRow>
          ))
        )}
      </DataGridWrapper>
    );
  }
}

DataGrid.propTypes = {
  columnHeaders: PropTypes.array.isRequired,
  rowData: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default DataGrid;
