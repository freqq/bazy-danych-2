import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ListPage from "dashboard/subpages/containers/ListPage";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import {
  clientRemove,
  clientsGet,
  clientAdd,
  clientSearch,
  clientsSort
} from "dashboard/subpages/actions/clientsActions";

const ListPageWithLoading = withLoading(ListPage, ProgIndSize.XX_LARGE);

const columnHeaders = [
  "First name",
  "Last name",
  "Pesel",
  "Birthday",
  "Email",
  "Discount",
  "IDNumber",
  "Actions"
];

class Clients extends Component {
  render() {
    const {
      isFetching,
      isError,
      clientsData,
      clientRemoving,
      searchClient,
      searchData,
      clientAdding,
      getClients,
      removeClient,
      clientEdit,
      addClient,
      sortClients
    } = this.props;

    return (
      <ListPageWithLoading
        isFetching={isFetching}
        isError={isError}
        pageTitle="Clients"
        pageIcon="fas fa-user-edit"
        objectsData={clientsData}
        searchData={searchData}
        getObjects={getClients}
        removeObject={removeClient}
        objectEdit={clientEdit}
        addObject={addClient}
        searchObjects={searchClient}
        sortObjects={sortClients}
        objectRemoving={clientRemoving}
        objectAdding={clientAdding}
        columnHeaders={columnHeaders}
      />
    );
  }
}

Clients.propTypes = {
  clientsData: PropTypes.array.isRequired,
  searchData: PropTypes.array.isRequired,
  getClients: PropTypes.func.isRequired,
  removeClient: PropTypes.func.isRequired,
  clientEdit: PropTypes.func.isRequired,
  addClient: PropTypes.func.isRequired,
  searchClient: PropTypes.func.isRequired,
  sortClients: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  clientRemoving: PropTypes.bool.isRequired,
  clientAdding: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  clientsData: state.subpages.clients.data,
  searchData: state.subpages.clients.searchData,
  isFetching: state.subpages.clients.isFetching,
  isError: state.subpages.clients.isError,
  clientRemoving: state.subpages.clients.remove.isFetching,
  clientAdding: state.subpages.clients.add.isFetching
});

const mapDispatchToProps = dispatch => ({
  getClients: () => dispatch(clientsGet()),
  removeClient: clientId => dispatch(clientRemove(clientId)),
  addClient: clientData => dispatch(clientAdd(clientData)),
  searchClient: searchData => dispatch(clientSearch(searchData)),
  sortClients: headerName => dispatch(clientsSort(headerName)),
  clientEdit: clientId => dispatch(push(`/admin/clients/${clientId}`))
});

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
