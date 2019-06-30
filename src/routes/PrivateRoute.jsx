/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layout';

class PrivateRoute extends React.Component {
  render() {
    const { ...rest } = this.props;
    const token = localStorage.getItem('token');
    return (
      token
        ? (
          <PrivateLayout {...rest}>
            <Route {...rest} />
          </PrivateLayout>
        )
        : <Redirect to="/" />
    );
  }
}


PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
