import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ListPage from "dashboard/subpages/containers/ListPage";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import {
  ticketRemove,
  ticketsGet,
  ticketAdd,
  ticketSearch,
  ticketsSort
} from "dashboard/subpages/actions/ticketsActions";

const ListPageWithLoading = withLoading(ListPage, ProgIndSize.XX_LARGE);

const columnHeaders = ["Price", "Seat number", "Actions"];

class Tickets extends Component {
  render() {
    const {
      isFetching,
      isError,
      ticketsData,
      ticketRemoving,
      searchTicket,
      searchData,
      ticketAdding,
      getTickets,
      removeTicket,
      ticketEdit,
      addTicket,
      sortTickets
    } = this.props;

    return (
      <ListPageWithLoading
        isFetching={isFetching}
        isError={isError}
        pageTitle="Tickets"
        pageIcon="fas fa-ticket-alt"
        objectsData={ticketsData}
        searchData={searchData}
        getObjects={getTickets}
        removeObject={removeTicket}
        objectEdit={ticketEdit}
        addObject={addTicket}
        searchObjects={searchTicket}
        sortObjects={sortTickets}
        objectRemoving={ticketRemoving}
        objectAdding={ticketAdding}
        columnHeaders={columnHeaders}
      />
    );
  }
}

Tickets.propTypes = {
  ticketsData: PropTypes.array.isRequired,
  searchData: PropTypes.array.isRequired,
  getTickets: PropTypes.func.isRequired,
  removeTicket: PropTypes.func.isRequired,
  ticketEdit: PropTypes.func.isRequired,
  addTicket: PropTypes.func.isRequired,
  searchTicket: PropTypes.func.isRequired,
  sortTickets: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  ticketRemoving: PropTypes.bool.isRequired,
  ticketAdding: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ticketsData: state.subpages.tickets.data,
  searchData: state.subpages.tickets.searchData,
  isFetching: state.subpages.tickets.isFetching,
  isError: state.subpages.tickets.isError,
  ticketRemoving: state.subpages.tickets.remove.isFetching,
  ticketAdding: state.subpages.tickets.add.isFetching
});

const mapDispatchToProps = dispatch => ({
  getTickets: () => dispatch(ticketsGet()),
  removeTicket: ticketId => dispatch(ticketRemove(ticketId)),
  addTicket: ticketData => dispatch(ticketAdd(ticketData)),
  searchTicket: searchData => dispatch(ticketSearch(searchData)),
  sortTickets: headerName => dispatch(ticketsSort(headerName)),
  ticketEdit: ticketId => dispatch(push(`/admin/tickets/${ticketId}`))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
