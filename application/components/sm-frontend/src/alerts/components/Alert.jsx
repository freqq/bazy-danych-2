import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'common/components/Button';
import AlertStatus from 'alerts/AlertStatus';
import Colors from 'common/colors';

const AlertColor = {
  [AlertStatus.ERROR]: Colors.VANILLA_ICE,
  [AlertStatus.INFO]: Colors.LINK_WATER,
  [AlertStatus.SUCCESS]: Colors.ZANAH,
};

const chooseColor = ({ status }) => AlertColor[status] || Colors.LINK_WATER;

const AlertLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 15px;
  background-color: ${chooseColor};
  width: 500px;
  height: 60px;
  border-radius: 5px;
`;

export default class Alert extends Component {
  static ALERT_TIMEOUT = 8000;

  componentDidMount() {
    setTimeout(this.closeAlert, Alert.ALERT_TIMEOUT);
  }

  closeAlert = () => this.props.close(this.props.id);

  render() {
    return (
      <AlertLayout status={this.props.status}>
        {this.props.text}
        <Button icon="ic_close" onClick={this.closeAlert} />
      </AlertLayout>
    );
  }
}

Alert.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
