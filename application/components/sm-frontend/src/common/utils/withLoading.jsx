import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProgressIndicatorCircular from "images/blue-indicator.svg";

export const ProgIndSize = {
  SMALL: { small: true },
  MEDIUM: { medium: true },
  LARGE: { large: true },
  X_LARGE: { xlarge: true },
  XX_LARGE: { xxlarge: true }
};

const CenteringWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
  weight: 100%;
`;

const withLoading = (Component, size = ProgIndSize.SMALL) => {
  const wrapped = ({ isLoading, ...props }) => {
    if (!isLoading) {
      return <Component {...props} />;
    }
    return (
      <CenteringWrapper>
        <img
          src={ProgressIndicatorCircular}
          alt="ProgressIndicatorCircular"
          id="progress-indicator"
        />
      </CenteringWrapper>
    );
  };
  wrapped.propTypes = {
    isLoading: PropTypes.bool.isRequired
  };
  return wrapped;
};

export default withLoading;
