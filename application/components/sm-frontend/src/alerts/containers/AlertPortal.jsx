import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { removeAlert } from 'alerts/alertActions';
import AlertList from 'alerts/components/AlertList';

const alertRoot = document.getElementById('alert-root');

const AlertPortal = ({ alerts, closeAlert }) =>
  ReactDOM.createPortal(<AlertList alerts={alerts} closeAlert={closeAlert} />, alertRoot);

const mapStateToProps = state => ({
  alerts: state.alerts,
});

const mapDispatchToProps = dispatch => ({
  closeAlert: id => dispatch(removeAlert(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertPortal);
