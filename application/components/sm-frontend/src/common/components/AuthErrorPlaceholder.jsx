import React from 'react';
import Placeholder from 'common/components/Placeholder';
import errorImage from 'images/error.svg';

const TITLE = 'Internal server error';
const SUBTITLE = 'There was an error fetching authenticated user data';
const ALT = 'Error fetching authenticated user data';
const CUSTOM_CLASS_NAME = 'auth-error-placeholder';

const AuthErrorPlaceholder = () => (
  <Placeholder
    src={errorImage}
    alt={ALT}
    title={TITLE}
    subtitle={SUBTITLE}
    customClassName={CUSTOM_CLASS_NAME}
  />
);

export default AuthErrorPlaceholder;
