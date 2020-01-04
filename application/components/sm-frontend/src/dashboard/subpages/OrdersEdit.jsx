import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import EditPage from "dashboard/subpages/containers/EditPage";
import {
  orderById,
  orderEdit,
  ticketsFetch,
  flightsFetch,
  clientsFetch
} from "dashboard/subpages/actions/ordersActions";
import { push } from "react-router-redux";

const EditWithLoading = withLoading(EditPage, ProgIndSize.XX_LARGE);

class OrdersEdit extends Component {
  componentWillMount() {
    this.props.fetchFlights();
    this.props.fetchClients();
    this.props.fetchTickets();
  }

  render() {
    const {
      isFetching,
      isError,
      isEditing,
      orderParameters,
      editOrder,
      getOrderData,
      ticketsData,
      flightsData,
      clientsData
    } = this.props;
    return (
      <EditWithLoading
        {...this.props}
        isFetching={isFetching}
        isError={isError}
        isEditing={isEditing}
        objectParameters={orderParameters}
        editObject={editOrder}
        getObjectData={getOrderData}
        pageTitle="Orders - Edit"
        pageIcon="fas fa-user-edit"
        ticketsData={ticketsData}
        flightsData={flightsData}
        clientsData={clientsData}
      />
    );
  }
}

OrdersEdit.propTypes = {
  editOrder: PropTypes.func.isRequired,
  getOrderData: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  orderParameters: PropTypes.array.isRequired,
  clientsData: PropTypes.array.isRequired,
  flightsData: PropTypes.array.isRequired,
  ticketsData: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.subpages.orders.edit.isFetching,
  isError: state.subpages.orders.edit.isError,
  orderParameters: state.subpages.orders.edit.data,
  isEditing: state.subpages.orders.edit.isEditing,
  clientsData: state.subpages.orders.clients.data,
  flightsData: state.subpages.orders.flights.data,
  ticketsData: state.subpages.orders.tickets.data
});

const mapDispatchToProps = dispatch => ({
  editOrder: (orderId, orderData) => dispatch(orderEdit(orderId, orderData)),
  getOrderData: orderId => dispatch(orderById(orderId)),
  handleCancel: () => dispatch(push(`/admin/orders/`)),
  fetchTickets: () => dispatch(ticketsFetch()),
  fetchFlights: () => dispatch(flightsFetch()),
  fetchClients: () => dispatch(clientsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersEdit);
