import React, { Component } from "react";
import styled from "styled-components";
import DashboardWidget from "dashboard/subpages/components/DashboardWidget";
import DashboardWidgetFull from "dashboard/subpages/components/DashboardWidgetFull";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchOrdersData,
  fetchPlanesWithLargerstNumberOfFlights,
  fetchPlanesBig
} from "dashboard/subpages/actions/dashboardActions";

const DashboardSupbage = styled.div.attrs({ className: "dashbaord-subpage" })`
  margin: 0;
  padding: 5px 30px;
  height: 76vh;
  overflow-y: scroll;
`;

const SubpageTitle = styled.p.attrs({ className: "subpage-title" })`
  font-size: 25px;
`;

const SubpageIcon = styled.li.attrs({ className: "side-navigation-left-icon" })`
  margin: 0 20px 0 0;
  color: #6079a2;
  width: 20px;
`;

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchOrders();
    this.props.fetchPlanes();
    this.props.fetchBigPlanes();
  }

  render() {
    const { ordersChartData, planesChartData, planesBigChartData } = this.props;
    return (
      <DashboardSupbage>
        <SubpageTitle>
          <SubpageIcon className="fas fa-home" />
          Dashboard
        </SubpageTitle>
        <DashboardWidget
          chartData={ordersChartData}
          widgetTitle="Most valuable flight orders"
        />
        <DashboardWidget
          chartData={planesChartData}
          widgetTitle="Planes with the largest number of flights"
        />
        <DashboardWidgetFull
          chartData={planesBigChartData}
          widgetTitle="Top 10 largest planes"
        />
      </DashboardSupbage>
    );
  }
}

Dashboard.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  ordersChartData: PropTypes.object.isRequired,
  planesChartData: PropTypes.object.isRequired,
  planesBigChartData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.subpages.dashboard.orders.isFetching,
  isError: state.subpages.dashboard.orders.isError,
  ordersChartData: state.subpages.dashboard.orders.data,
  planesChartData: state.subpages.dashboard.planes.data,
  planesBigChartData: state.subpages.dashboard.largePlanes.data
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrdersData()),
  fetchPlanes: () => dispatch(fetchPlanesWithLargerstNumberOfFlights()),
  fetchBigPlanes: () => dispatch(fetchPlanesBig())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
