import React, { Component } from "react";
import styled from "styled-components";
import AddNew from "dashboard/subpages/components/AddNew";
import BooleanGridCell from "dashboard/subpages/components/BooleanGridCell";
import DateGridCell from "dashboard/subpages/components/DateGridCell";
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

  &:hover {
    background: #fafafa;
    cursor: pointer;
  }

  &:last-child:hover {
    cursor: auto;
    background: #ffffff;
  }
`;

export const DataGridCell = styled.div.attrs({ className: "data-grid-cell" })`
  border-right: 1px solid #edf2f4;
  padding: 10px;

  &:hover {
    cursor: pointer;
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
  camelize = string =>
    string
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");

  render() {
    return (
      <DataGridWrapper>
        <DataGridRow>
          {this.props.columnHeaders.map(item => (
            <DataGridCell
              onClick={() => this.props.onSort(this.camelize(item))}
            >
              {item}
            </DataGridCell>
          ))}
        </DataGridRow>
        {this.props.rowData.length === 0 ? (
          <NoData>No data.</NoData>
        ) : (
          this.props.rowData.map(item => (
            <DataGridRow key={item} className='data-grid-row-data'>
              {Object.keys(item).map(key => {
                if (key !== "id") {
                  if (key.toLowerCase().includes("discount"))
                    return (
                      <BooleanGridCell
                        value={item[key]}
                        onClick={() => this.props.onEdit(item.id)}
                      />
                    );
                  if (
                    key.toLowerCase().includes("birthday") ||
                    key.toLowerCase() === "flightdate"
                  )
                    return (
                      <DateGridCell
                        value={item[key]}
                        onClick={() => this.props.onEdit(item.id)}
                      />
                    );
                  return (
                    <DataGridCellMutable
                      value={item[key]}
                      onClick={() => this.props.onEdit(item.id)}
                    />
                  );
                }
              })}
              <DataGridCell>
                <ActionButton
                  id="delete-button"
                  className="far fa-trash-alt"
                  onClick={() => this.props.onDelete(item.id)}
                />
              </DataGridCell>
            </DataGridRow>
          ))
        )}
        <AddNew
          pageTitle={this.props.pageTitle}
          columnHeaders={this.props.columnHeaders}
          onClick={this.props.onAdd}
          carriersData={this.props.carriersData}
          planesData={this.props.planesData}
          ticketsData={this.props.ticketsData}
          flightsData={this.props.flightsData}
          clientsData={this.props.clientsData}
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
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  carriersData: PropTypes.array,
  planesData: PropTypes.array,
  clientsData: PropTypes.array,
  flightsData: PropTypes.array,
  ticketsData: PropTypes.array,
  pageTitle: PropTypes.string
};

export default DataGrid;
