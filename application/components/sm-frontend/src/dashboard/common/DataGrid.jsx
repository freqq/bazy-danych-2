import React, { Component } from "react";
import styled from "styled-components";
import AddNew from "dashboard/subpages/components/AddNew";
import DataGridCellMutable from "dashboard/common/DataGridCell";
import PropTypes from "prop-types";

const DataGridWrapper = styled.ul.attrs({ className: "data-grid-wrapper" })`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 100%;
`;

export const DataGridRow = styled.li.attrs({ className: "data-grid-row" })`
  margin: 0;
  border-top: 1px solid #edf2f4;
  border-bottom: 1px solid #edf2f4;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  font-size: 11px;
  transition: 0.2s;

  &:nth-child(1) {
    background: #f6f8f9;
    font-size: 15px;
  }
`;

export const DataGridCell = styled.div.attrs({ className: "data-grid-cell" })`
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

export const ActionButton = styled.button.attrs({ className: "action-button" })`
  padding: 5px 7px;
  border-radius: 50%;
  font-size: 15px;
  color: #3e577f;
  border: none;
  background: #ffffff;

  &:hover {
    cursor: pointer;
    background: #edf2f4;
  }

  &:disabled {
    opacity: 0.6;
  }

  &:disabled:hover {
    cursor: auto;
    background: #ffffff;
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
          <NoData>No data available to fetch from server.</NoData>
        ) : (
          this.props.rowData.map(item => (
            <DataGridRow>
              <DataGridCellMutable value={item.planeModel} />
              <DataGridCellMutable value={item.seatsCount} />
              <DataGridCell>
                <ActionButton
                  className="far fa-trash-alt"
                  onClick={() => this.props.onDelete(item.id)}
                />
              </DataGridCell>
            </DataGridRow>
          ))
        )}
        <AddNew
          columnHeaders={this.props.columnHeaders}
          onClick={this.props.onAdd}
        />
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
