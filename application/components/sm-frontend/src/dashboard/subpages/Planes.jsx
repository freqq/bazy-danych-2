import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ListPage from "dashboard/subpages/containers/ListPage";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import {
  planeRemove,
  planesGet,
  planeAdd,
  planeSearch,
  planesSort
} from "dashboard/subpages/actions/planesActions";

const ListPageWithLoading = withLoading(ListPage, ProgIndSize.XX_LARGE);

const columnHeaders = ["Plane model", "Seats count", "Actions"];

class Planes extends Component {
  render() {
    const {
      isFetching,
      isError,
      planesData,
      planeRemoving,
      searchPlane,
      searchData,
      planeAdding,
      getPlanes,
      removePlane,
      planeEdit,
      addPlane,
      sortPlanes
    } = this.props;

    return (
      <ListPageWithLoading
        isFetching={isFetching}
        isError={isError}
        pageTitle="Planes"
        pageIcon="fas fa-plane"
        objectsData={planesData}
        searchData={searchData}
        getObjects={getPlanes}
        removeObject={removePlane}
        objectEdit={planeEdit}
        addObject={addPlane}
        searchObjects={searchPlane}
        sortObjects={sortPlanes}
        objectRemoving={planeRemoving}
        objectAdding={planeAdding}
        columnHeaders={columnHeaders}
      />
    );
  }
}

Planes.propTypes = {
  planesData: PropTypes.array.isRequired,
  searchData: PropTypes.array.isRequired,
  getPlanes: PropTypes.func.isRequired,
  removePlane: PropTypes.func.isRequired,
  planeEdit: PropTypes.func.isRequired,
  addPlane: PropTypes.func.isRequired,
  searchPlane: PropTypes.func.isRequired,
  sortPlanes: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  planeRemoving: PropTypes.bool.isRequired,
  planeAdding: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  planesData: state.subpages.planes.data,
  searchData: state.subpages.planes.searchData,
  isFetching: state.subpages.planes.isFetching,
  isError: state.subpages.planes.isError,
  planeRemoving: state.subpages.planes.remove.isFetching,
  planeAdding: state.subpages.planes.add.isFetching
});

const mapDispatchToProps = dispatch => ({
  getPlanes: () => dispatch(planesGet()),
  removePlane: planeId => dispatch(planeRemove(planeId)),
  addPlane: planeData => dispatch(planeAdd(planeData)),
  searchPlane: searchData => dispatch(planeSearch(searchData)),
  sortPlanes: headerName => dispatch(planesSort(headerName)),
  planeEdit: planeId => dispatch(push(`/admin/planes/${planeId}`))
});

export default connect(mapStateToProps, mapDispatchToProps)(Planes);
