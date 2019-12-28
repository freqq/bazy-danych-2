import React from "react";
import styled from "styled-components";
import ProgressIndicatorCircularImage from "images/progress_indicator.svg";

const CenteringWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  weight: 100%;
`;

const ProgressIndicatorCircular = () => {
  return (
    <CenteringWrapper>
      <img src={ProgressIndicatorCircularImage} />
    </CenteringWrapper>
  );
};

export default ProgressIndicatorCircular;
