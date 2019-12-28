import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fadeIn, fadeOut } from 'common/animations';
import Alert from 'alerts/components/Alert';

const ANIMATION_TIMEOUT = 300;
const ANIMATION_NAME = 'fade';

const AlertContainer = styled.div.attrs()`
  position: fixed;
  right: 20px;
  bottom: 20px;

  ${fadeIn(ANIMATION_NAME, ANIMATION_TIMEOUT)} ${fadeOut(ANIMATION_NAME, ANIMATION_TIMEOUT)};
`;

export default class AlertList extends Component {
  createAlert = alert => (
    <CSSTransition key={alert.id} timeout={ANIMATION_TIMEOUT} classNames={ANIMATION_NAME}>
      <Alert id={alert.id} text={alert.text} status={alert.status} close={this.props.closeAlert} />
    </CSSTransition>
  );

  render() {
    return (
      <AlertContainer>
        <TransitionGroup>{this.props.alerts.map(this.createAlert)}</TransitionGroup>
      </AlertContainer>
    );
  }
}

AlertList.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ).isRequired,
  closeAlert: PropTypes.func.isRequired,
};
