import React from 'react';
import PropTypes from 'prop-types';

import { NavBar } from '../../components';

const PrivateLayout = ({ children, ...rest }) => (
  <React.Fragment>
    <NavBar {...rest} />
    {children}
  </React.Fragment>
);

PrivateLayout.propTypes = {
  children: PropTypes.shape({
    types: PropTypes.string,
  }).isRequired,
};
export default PrivateLayout;
