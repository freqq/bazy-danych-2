import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import EditPage from "dashboard/subpages/containers/EditPage";
import {
  ticketById,
  ticketEdit
} from "dashboard/subpages/actions/ticketsActions";
import { push } from "react-router-redux";

const EditWithLoading = withLoading(EditPage, ProgIndSize.XX_LARGE);

class TicketsEdit extends Component {
  render() {
    const {
      isFetching,
      isError,
      isEditing,
      ticketParameters,
      editTicket,
      getTicketData
    } = this.props;
    return (
      <EditWithLoading
        {...this.props}
        isFetching={isFetching}
        isError={isError}
        isEditing={isEditing}
        objectParameters={ticketParameters}
        editObject={editTicket}
        getObjectData={getTicketData}
        pageTitle="Tickets - Edit"
        pageIcon="fas fa-user-edit"
      />
    );
  }
}

TicketsEdit.propTypes = {
  editTicket: PropTypes.func.isRequired,
  getTicketData: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  ticketParameters: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.subpages.tickets.edit.isFetching,
  isError: state.subpages.tickets.edit.isError,
  ticketParameters: state.subpages.tickets.edit.data,
  isEditing: state.subpages.tickets.edit.isEditing
});

const mapDispatchToProps = dispatch => ({
  editTicket: (ticketId, ticketData) =>
    dispatch(ticketEdit(ticketId, ticketData)),
  getTicketData: ticketId => dispatch(ticketById(ticketId)),
  handleCancel: () => dispatch(push(`/admin/tickets/`))
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketsEdit);
