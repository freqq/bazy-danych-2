import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ListPage from "dashboard/subpages/containers/ListPage";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import {
  flightRemove,
  flightsGet,
  flightAdd,
  flightSearch,
  flightsSort,
  carrierNamesGet,
  planesNamesGet
} from "dashboard/subpages/actions/flightsActions";

const ListPageWithLoading = withLoading(ListPage, ProgIndSize.XX_LARGE);

const columnHeaders = [
  "Destination Place",
  "Start Place",
  "Flight Date",
  "Carrier Name",
  "Plane Name",
  "Actions"
];

class Flights extends Component {
  componentWillMount() {
    this.props.getCarriers();
    this.props.getPlanes();
  }

  render() {
    const {
      isFetching,
      isError,
      flightsData,
      flightRemoving,
      searchFlight,
      searchData,
      flightAdding,
      getFlights,
      removeFlight,
      flightEdit,
      addFlight,
      sortFlights,
      carriersData,
      planesData
    } = this.props;

    return (
      <ListPageWithLoading
        isFetching={isFetching}
        isError={isError}
        pageTitle="Flights"
        pageIcon="fas fa-business-time"
        objectsData={flightsData}
        searchData={searchData}
        getObjects={getFlights}
        removeObject={removeFlight}
        objectEdit={flightEdit}
        addObject={addFlight}
        searchObjects={searchFlight}
        sortObjects={sortFlights}
        objectRemoving={flightRemoving}
        objectAdding={flightAdding}
        columnHeaders={columnHeaders}
        carriersData={carriersData}
        planesData={planesData}
      />
    );
  }
}

Flights.propTypes = {
  flightsData: PropTypes.array.isRequired,
  searchData: PropTypes.array.isRequired,
  carriersData: PropTypes.array.isRequired,
  planesData: PropTypes.array.isRequired,
  getFlights: PropTypes.func.isRequired,
  getCarriers: PropTypes.func.isRequired,
  removeFlight: PropTypes.func.isRequired,
  flightEdit: PropTypes.func.isRequired,
  addFlight: PropTypes.func.isRequired,
  searchFlight: PropTypes.func.isRequired,
  sortFlights: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  flightRemoving: PropTypes.bool.isRequired,
  flightAdding: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  flightsData: state.subpages.flights.data,
  searchData: state.subpages.flights.searchData,
  isFetching: state.subpages.flights.isFetching,
  isError: state.subpages.flights.isError,
  flightRemoving: state.subpages.flights.remove.isFetching,
  flightAdding: state.subpages.flights.add.isFetching,
  carriersData: state.subpages.flights.carriers.data,
  planesData: state.subpages.flights.planes.data
});

const mapDispatchToProps = dispatch => ({
  getFlights: () => dispatch(flightsGet()),
  removeFlight: flightId => dispatch(flightRemove(flightId)),
  addFlight: flightData => dispatch(flightAdd(flightData)),
  searchFlight: searchData => dispatch(flightSearch(searchData)),
  sortFlights: headerName => dispatch(flightsSort(headerName)),
  flightEdit: flightId => dispatch(push(`/admin/flights/${flightId}`)),
  getCarriers: () => dispatch(carrierNamesGet()),
  getPlanes: () => dispatch(planesNamesGet())
});

export default connect(mapStateToProps, mapDispatchToProps)(Flights);
