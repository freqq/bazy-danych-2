import React, { Component } from "react";
import DataGrid from "dashboard/common/DataGrid";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import FetchingErrorPlaceholder from "common/components/FetchingErrorPlaceholder";
import ProgressIndicatorCircular from "common/components/ProgressIndicatorCircular";
import Search from "dashboard/subpages/components/Search";
import { applyStyle } from "common/components/DisableOverlay";
import {
  planeRemove,
  planesGet,
  planeEdit,
  planeAdd,
  planeSearch
} from "dashboard/subpages/actions/planesActions";

const PlanesSupbage = styled.div.attrs({ className: "dashbaord-subpage" })`
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

const columnHeaders = ["Plane model", "Seats count", "Actions"];

class Planes extends Component {
  componentDidMount() {
    this.props.getPlanes();
  }

  render() {
    const {
      isFetching,
      isError,
      planesData,
      planeRemoving,
      searchPlane,
      searchData
    } = this.props;
    if (isError) return <FetchingErrorPlaceholder />;
    return (
      <PlanesSupbageWithLoading
        isLoading={isFetching}
        style={applyStyle(planeRemoving)}
      >
        {planeRemoving && <ProgressIndicatorCircular />}

        <SubpageTitle>
          <SubpageIcon className="fas fa-plane" />
          Planes
        </SubpageTitle>
        <Search rowData={planesData} searchPlane={searchPlane} />
        <DataGrid
          isLoading={isFetching}
          columnHeaders={columnHeaders}
          onDelete={this.props.removePlane}
          onAdd={this.props.addPlane}
          onEdit={this.editPlane}
          rowData={searchData}
        />
      </PlanesSupbageWithLoading>
    );
  }
}

Planes.propTypes = {
  planesData: PropTypes.array.isRequired,
  searchData: PropTypes.array.isRequired,
  getPlanes: PropTypes.func.isRequired,
  removePlane: PropTypes.func.isRequired,
  editPlane: PropTypes.func.isRequired,
  addPlane: PropTypes.func.isRequired,
  searchPlane: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  planeRemoving: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  planesData: state.subpages.planes.data,
  searchData: state.subpages.planes.searchData,
  isFetching: state.subpages.planes.isFetching,
  isError: state.subpages.planes.isError,
  planeRemoving: state.subpages.planes.remove.isFetching
});

const mapDispatchToProps = dispatch => ({
  getPlanes: () => dispatch(planesGet()),
  removePlane: planeId => dispatch(planeRemove(planeId)),
  editPlane: planeData => dispatch(planeEdit(planeData)),
  addPlane: planeData => dispatch(planeAdd(planeData)),
  searchPlane: searchData => dispatch(planeSearch(searchData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Planes);
