import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import EditPage from "dashboard/subpages/containers/EditPage";
import {
  flightById,
  flightEdit,
  carrierNamesGet,
  planesNamesGet
} from "dashboard/subpages/actions/flightsActions";
import { push } from "react-router-redux";

const EditWithLoading = withLoading(EditPage, ProgIndSize.XX_LARGE);

class FlightEdit extends Component {
  componentWillMount() {
    this.props.getCarriers();
    this.props.getPlanes();
  }

  render() {
    const {
      isFetching,
      isError,
      isEditing,
      flightParameters,
      editFlight,
      getFlightData,
      planesData,
      carriersData
    } = this.props;

    return (
      <EditWithLoading
        {...this.props}
        isFetching={isFetching}
        isError={isError}
        isEditing={isEditing}
        objectParameters={flightParameters}
        carriersData={carriersData}
        planesData={planesData}
        editObject={editFlight}
        getObjectData={getFlightData}
        pageTitle="Flights - Edit"
        pageIcon="fas fa-business-time"
      />
    );
  }
}

FlightEdit.propTypes = {
  editFlight: PropTypes.func.isRequired,
  getFlightData: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  getCarriers: PropTypes.func.isRequired,
  getPlanes: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  flightParameters: PropTypes.array.isRequired,
  carriersData: PropTypes.array.isRequired,
  planesData: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.subpages.flights.edit.isFetching,
  isError: state.subpages.flights.edit.isError,
  flightParameters: state.subpages.flights.edit.data,
  isEditing: state.subpages.flights.edit.isEditing,
  carriersData: state.subpages.flights.carriers.data,
  planesData: state.subpages.flights.planes.data
});

const mapDispatchToProps = dispatch => ({
  editFlight: (flightId, flightData) =>
    dispatch(flightEdit(flightId, flightData)),
  getFlightData: flightId => dispatch(flightById(flightId)),
  handleCancel: () => dispatch(push(`/admin/flights/`)),
  getCarriers: () => dispatch(carrierNamesGet()),
  getPlanes: () => dispatch(planesNamesGet())
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightEdit);
