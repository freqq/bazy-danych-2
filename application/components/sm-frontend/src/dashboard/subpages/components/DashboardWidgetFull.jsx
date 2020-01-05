import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Bar, Line } from "react-chartjs-2";

const DashboardWidgetWrapper = styled.div.attrs({
  className: "dashbaord-widget-wrapper"
})`
  margin: 0;
  padding: 0;
  width: 97%;
  border: 2px solid #f1f1f1;
  font-size: 12px;
  font-family: "Roboto", "sans-serif";
  border-radius: 5px;
  display: inline-block;
  margin-top: 50px;
`;

const StyledLine = styled(Bar).attrs({ className: "styled-line" })``;

const WidgetTitle = styled.p.attrs({ className: "widget-title" })`
  font-size: 12px;
  font-weight: 500;
  color: #40587d;
  padding: 10px;
  background: #f1f1f1;
  margin: 0 0 20px 0;
`;

class DashboardWidget extends Component {
  render() {
    const {
      widgetTitle,
      chartData,
      displayTitle,
      displayLegend,
      legendPosition
    } = this.props;

    return (
      <DashboardWidgetWrapper>
        <WidgetTitle>{widgetTitle}</WidgetTitle>
        <StyledLine
          data={chartData}
          height="150"
          options={{
            title: {
              display: displayTitle,
              text: widgetTitle,
              fontSize: 18
            },
            legend: {
              display: displayLegend,
              position: legendPosition
            }
          }}
        />
      </DashboardWidgetWrapper>
    );
  }
}

DashboardWidget.defaultProps = {
  displayTitle: false,
  displayLegend: true,
  legendPosition: "right"
};

DashboardWidget.propTypes = {
  displayTitle: PropTypes.bool,
  displayLegend: PropTypes.bool,
  legendPosition: PropTypes.string,
  chartData: PropTypes.object.isRequired,
  widgetTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default DashboardWidget;
