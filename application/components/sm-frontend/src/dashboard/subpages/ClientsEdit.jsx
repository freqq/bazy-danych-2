import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import EditPage from "dashboard/subpages/containers/EditPage";
import {
  clientById,
  clientEdit
} from "dashboard/subpages/actions/clientsActions";
import { push } from "react-router-redux";

const EditWithLoading = withLoading(EditPage, ProgIndSize.XX_LARGE);

class ClientsEdit extends Component {
  render() {
    const {
      isFetching,
      isError,
      isEditing,
      clientParameters,
      editClient,
      getClientData
    } = this.props;
    return (
      <EditWithLoading
        {...this.props}
        isFetching={isFetching}
        isError={isError}
        isEditing={isEditing}
        objectParameters={clientParameters}
        editObject={editClient}
        getObjectData={getClientData}
        pageTitle="Clients - Edit"
        pageIcon="fas fa-user-edit"
      />
    );
  }
}

ClientsEdit.propTypes = {
  editClient: PropTypes.func.isRequired,
  getClientData: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  clientParameters: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.subpages.clients.edit.isFetching,
  isError: state.subpages.clients.edit.isError,
  clientParameters: state.subpages.clients.edit.data,
  isEditing: state.subpages.clients.edit.isEditing
});

const mapDispatchToProps = dispatch => ({
  editClient: (clientId, clientData) =>
    dispatch(clientEdit(clientId, clientData)),
  getClientData: clientId => dispatch(clientById(clientId)),
  handleCancel: () => dispatch(push(`/admin/clients/`))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsEdit);
