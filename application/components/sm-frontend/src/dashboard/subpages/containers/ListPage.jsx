import React, { Component } from "react";
import DataGrid from "dashboard/common/DataGrid";
import PropTypes from "prop-types";
import styled from "styled-components";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import FetchingErrorPlaceholder from "common/components/FetchingErrorPlaceholder";
import ProgressIndicatorCircular from "common/components/ProgressIndicatorCircular";
import Search from "dashboard/subpages/components/Search";
import { applyStyle } from "common/components/DisableOverlay";

const PlanesSupbage = styled.div.attrs({ className: "dashboard-subpage" })`
  margin: 0;
  padding: 5px 30px;
  position: relative;
`;

const PlanesSupbageWithLoading = withLoading(
  PlanesSupbage,
  ProgIndSize.XX_LARGE
);

const SubpageTitle = styled.p.attrs({ className: "subpage-title" })`
  font-size: 25px;
`;

const SubpageIcon = styled.li.attrs({ className: "side-navigation-left-icon" })`
  margin: 0 20px 0 0;
  color: #6079a2;
  width: 20px;
`;

class ListPage extends Component {
  componentDidMount() {
    this.props.getObjects();
  }

  render() {
    const {
      isFetching,
      isError,
      objectsData,
      objectRemoving,
      searchObjects,
      searchData,
      objectAdding,
      pageIcon,
      pageTitle,
      carriersData,
      planesData
    } = this.props;

    if (isError) return <FetchingErrorPlaceholder />;
    return (
      <PlanesSupbageWithLoading
        isLoading={isFetching}
        style={applyStyle(objectRemoving || objectAdding)}
      >
        {(objectRemoving || objectAdding) && <ProgressIndicatorCircular />}

        <SubpageTitle>
          <SubpageIcon className={pageIcon} />
          {pageTitle}
        </SubpageTitle>
        <Search rowData={objectsData} searchObjects={searchObjects} />
        <DataGrid
          carriersData={carriersData}
          planesData={planesData}
          isLoading={isFetching}
          columnHeaders={this.props.columnHeaders}
          onDelete={this.props.removeObject}
          onAdd={this.props.addObject}
          onEdit={this.props.objectEdit}
          rowData={searchData}
          onSort={this.props.sortObjects}
        />
      </PlanesSupbageWithLoading>
    );
  }
}

ListPage.propTypes = {
  objectsData: PropTypes.array.isRequired,
  searchData: PropTypes.array.isRequired,
  getObjects: PropTypes.func.isRequired,
  removeObject: PropTypes.func.isRequired,
  objectEdit: PropTypes.func.isRequired,
  addObject: PropTypes.func.isRequired,
  searchObjects: PropTypes.func.isRequired,
  sortObjects: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  objectRemoving: PropTypes.bool.isRequired,
  objectAdding: PropTypes.bool.isRequired,
  pageIcon: PropTypes.string.isRequired,
  columnHeaders: PropTypes.array.isRequired,
  carriersData: PropTypes.array,
  planesData: PropTypes.array,
};

export default ListPage;
