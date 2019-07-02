/* eslint-disable react/prop-types */
import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

const withLoader = WrappedComponent => (props) => {
  const {
    loading,
  } = props;
  if (loading) {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
  return (
    <WrappedComponent {...props} />
  );
};
export default withLoader;
