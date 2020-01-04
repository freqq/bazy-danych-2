import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ListPage from "dashboard/subpages/containers/ListPage";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import {
  orderRemove,
  ordersGet,
  orderAdd,
  orderSearch,
  ordersSort,
  ticketsFetch,
  flightsFetch,
  clientsFetch
} from "dashboard/subpages/actions/ordersActions";

const ListPageWithLoading = withLoading(ListPage, ProgIndSize.XX_LARGE);

const columnHeaders = [
  "Client",
  "Flight",
  "Ticket",
  "Baggage Weight",
  "Flight Class",
  "Actions"
];

class Orders extends Component {
  componentWillMount() {
    this.props.fetchFlights();
    this.props.fetchClients();
    this.props.fetchTickets();
  }

  render() {
    const {
      isFetching,
      isError,
      ordersData,
      orderRemoving,
      searchOrder,
      searchData,
      orderAdding,
      getOrders,
      removeOrder,
      orderEdit,
      addOrder,
      sortOrders,
      ticketsData,
      flightsData,
      clientsData
    } = this.props;

    return (
      <ListPageWithLoading
        isFetching={isFetching}
        isError={isError}
        pageTitle="Orders"
        pageIcon="fas fa-shopping-cart"
        objectsData={ordersData}
        searchData={searchData}
        getObjects={getOrders}
        removeObject={removeOrder}
        objectEdit={orderEdit}
        addObject={addOrder}
        searchObjects={searchOrder}
        sortObjects={sortOrders}
        objectRemoving={orderRemoving}
        objectAdding={orderAdding}
        columnHeaders={columnHeaders}
        ticketsData={ticketsData}
        flightsData={flightsData}
        clientsData={clientsData}
      />
    );
  }
}

Orders.propTypes = {
  ordersData: PropTypes.array.isRequired,
  searchData: PropTypes.array.isRequired,
  getOrders: PropTypes.func.isRequired,
  removeOrder: PropTypes.func.isRequired,
  orderEdit: PropTypes.func.isRequired,
  addOrder: PropTypes.func.isRequired,
  searchOrder: PropTypes.func.isRequired,
  sortOrders: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  orderRemoving: PropTypes.bool.isRequired,
  orderAdding: PropTypes.bool.isRequired,
  clientsData: PropTypes.array.isRequired,
  flightsData: PropTypes.array.isRequired,
  ticketsData: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  ordersData: state.subpages.orders.data,
  searchData: state.subpages.orders.searchData,
  isFetching: state.subpages.orders.isFetching,
  isError: state.subpages.orders.isError,
  orderRemoving: state.subpages.orders.remove.isFetching,
  orderAdding: state.subpages.orders.add.isFetching,
  clientsData: state.subpages.orders.clients.data,
  flightsData: state.subpages.orders.flights.data,
  ticketsData: state.subpages.orders.tickets.data
});

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(ordersGet()),
  removeOrder: orderId => dispatch(orderRemove(orderId)),
  addOrder: orderData => dispatch(orderAdd(orderData)),
  searchOrder: searchData => dispatch(orderSearch(searchData)),
  sortOrders: headerName => dispatch(ordersSort(headerName)),
  orderEdit: orderId => dispatch(push(`/admin/orders/${orderId}`)),
  fetchTickets: () => dispatch(ticketsFetch()),
  fetchFlights: () => dispatch(flightsFetch()),
  fetchClients: () => dispatch(clientsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
