import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AuthLayout } from '../layout';

class AuthRoute extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <AuthLayout {...rest}>
        <Route {...rest} />
      </AuthLayout>
    );
  }
}

export default AuthRoute;
