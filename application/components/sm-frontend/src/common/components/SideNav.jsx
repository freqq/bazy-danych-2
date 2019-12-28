import React, { Component } from 'react'
import styled from "styled-components";

const SideNavWrapper = styled.div.attrs({ className: "sidenav-component" })`
  grid-area: sidenav;
`;

class SideNav extends Component {
    render() {
        return (
            <SideNavWrapper>
                sidenav
            </SideNavWrapper>
        )
    }
}

export default SideNav;