import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import EditPage from "dashboard/subpages/containers/EditPage";
import {
  carrierById,
  carrierEdit
} from "dashboard/subpages/actions/carriersActions";
import { push } from "react-router-redux";

const EditWithLoading = withLoading(EditPage, ProgIndSize.XX_LARGE);

class CarriersEdit extends Component {
  render() {
    const {
      isFetching,
      isError,
      isEditing,
      carrierParameters,
      editCarrier,
      getCarrierData
    } = this.props;
    return (
      <EditWithLoading
        {...this.props}
        isFetching={isFetching}
        isError={isError}
        isEditing={isEditing}
        objectParameters={carrierParameters}
        editObject={editCarrier}
        getObjectData={getCarrierData}
        pageTitle="Carriers - Edit"
        pageIcon="fas fa-user-tie"
      />
    );
  }
}

CarriersEdit.propTypes = {
  editCarrier: PropTypes.func.isRequired,
  getCarrierData: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  carrierParameters: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.subpages.carriers.edit.isFetching,
  isError: state.subpages.carriers.edit.isError,
  carrierParameters: state.subpages.carriers.edit.data,
  isEditing: state.subpages.carriers.edit.isEditing
});

const mapDispatchToProps = dispatch => ({
  editCarrier: (carrierId, carrierData) =>
    dispatch(carrierEdit(carrierId, carrierData)),
  getCarrierData: carrierId => dispatch(carrierById(carrierId)),
  handleCancel: () => dispatch(push(`/admin/carriers/`))
});

export default connect(mapStateToProps, mapDispatchToProps)(CarriersEdit);
