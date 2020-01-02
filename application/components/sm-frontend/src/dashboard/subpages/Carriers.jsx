import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ListPage from "dashboard/subpages/containers/ListPage";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import {
  carrierRemove,
  carriersGet,
  carrierAdd,
  carrierSearch,
  carriersSort
} from "dashboard/subpages/actions/carriersActions";

const ListPageWithLoading = withLoading(ListPage, ProgIndSize.XX_LARGE);

const columnHeaders = ["Carrier name", "Actions"];

class Carriers extends Component {
  render() {
    const {
      isFetching,
      isError,
      carriersData,
      carrierRemoving,
      searchCarrier,
      searchData,
      carrierAdding,
      getCarriers,
      removeCarrier,
      carrierEdit,
      addCarrier,
      sortCarriers
    } = this.props;

    return (
      <ListPageWithLoading
        isFetching={isFetching}
        isError={isError}
        pageTitle="Carriers"
        pageIcon="fas fa-user-tie"
        objectsData={carriersData}
        searchData={searchData}
        getObjects={getCarriers}
        removeObject={removeCarrier}
        objectEdit={carrierEdit}
        addObject={addCarrier}
        searchObjects={searchCarrier}
        sortObjects={sortCarriers}
        objectRemoving={carrierRemoving}
        objectAdding={carrierAdding}
        columnHeaders={columnHeaders}
      />
    );
  }
}

Carriers.propTypes = {
  carriersData: PropTypes.array.isRequired,
  searchData: PropTypes.array.isRequired,
  getCarriers: PropTypes.func.isRequired,
  removeCarrier: PropTypes.func.isRequired,
  carrierEdit: PropTypes.func.isRequired,
  addCarrier: PropTypes.func.isRequired,
  searchCarrier: PropTypes.func.isRequired,
  sortCarriers: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  carrierRemoving: PropTypes.bool.isRequired,
  carrierAdding: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  carriersData: state.subpages.carriers.data,
  searchData: state.subpages.carriers.searchData,
  isFetching: state.subpages.carriers.isFetching,
  isError: state.subpages.carriers.isError,
  carrierRemoving: state.subpages.carriers.remove.isFetching,
  carrierAdding: state.subpages.carriers.add.isFetching
});

const mapDispatchToProps = dispatch => ({
  getCarriers: () => dispatch(carriersGet()),
  removeCarrier: carrierId => dispatch(carrierRemove(carrierId)),
  addCarrier: carrierData => dispatch(carrierAdd(carrierData)),
  searchCarrier: searchData => dispatch(carrierSearch(searchData)),
  sortCarriers: headerName => dispatch(carriersSort(headerName)),
  carrierEdit: carrierId => dispatch(push(`/admin/carriers/${carrierId}`))
});

export default connect(mapStateToProps, mapDispatchToProps)(Carriers);
