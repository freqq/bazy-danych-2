import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import EditPage from "dashboard/subpages/containers/EditPage";
import { planeById, planeEdit } from "dashboard/subpages/actions/planesActions";
import { push } from "react-router-redux";

const EditWithLoading = withLoading(EditPage, ProgIndSize.XX_LARGE);

class PlaneEdit extends Component {
  render() {
    const {
      isFetching,
      isError,
      isEditing,
      planeParameters,
      editPlane,
      getPlaneData
    } = this.props;
    return (
      <EditWithLoading
        {...this.props}
        isFetching={isFetching}
        isError={isError}
        isEditing={isEditing}
        objectParameters={planeParameters}
        editObject={editPlane}
        getObjectData={getPlaneData}
        pageTitle="Planes - Edit"
        pageIcon="fas fa-plane"
      />
    );
  }
}

PlaneEdit.propTypes = {
  editPlane: PropTypes.func.isRequired,
  getPlaneData: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  planeParameters: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.subpages.planes.edit.isFetching,
  isError: state.subpages.planes.edit.isError,
  planeParameters: state.subpages.planes.edit.data,
  isEditing: state.subpages.planes.edit.isEditing
});

const mapDispatchToProps = dispatch => ({
  editPlane: (planeId, planeData) => dispatch(planeEdit(planeId, planeData)),
  getPlaneData: planeId => dispatch(planeById(planeId)),
  handleCancel: () => dispatch(push(`/admin/planes/`))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaneEdit);
