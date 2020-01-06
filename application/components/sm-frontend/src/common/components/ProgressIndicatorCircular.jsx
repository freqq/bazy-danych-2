import React from "react";
import styled from "styled-components";
import ProgressIndicatorCircularImage from "images/blue-indicator.svg";

const CenteringWrapper = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  z-index: 99;
`;

const ProgressIndicatorCircular = () => {
  return (
    <CenteringWrapper>
      <img
        src={ProgressIndicatorCircularImage}
        alt="ProgressIndicatorCircularImage"
        id="progress-indicator"
      />
    </CenteringWrapper>
  );
};

export default ProgressIndicatorCircular;
