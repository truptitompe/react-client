import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { NavBar } from '../../components';
import { CountryTable } from '../../components/Table';
import { SideBar } from '../../components/SideBar';

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',

  },
  table: {
    marginLeft: theme.spacing(20),
    padding: theme.spacing(100),
  },

});
class WeatherDemo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <NavBar />
        <div className={classes.root}>
          <SideBar />
          <div className={classes.table}>
            <CountryTable
              id="id"
              // data={data}
              columns={[
                {
                  field: 'city',
                  label: 'City',
                  align: 'center',
                },
                {
                  field: 'location',
                  label: 'Location',
                  format: value => value && value.toUpperCase(),
                },
                {
                  field: 'parameter',
                  label: 'Parameter',
                  align: 'center',
                  format: this.getDateFormatted,
                },
                {
                  field: 'value',
                  label: 'Value',
                },
                {
                  field: 'unit',
                  label: 'Unit',
                },
              ]}
            />
          </div>
        </div>
      </>
    );
  }
}
WeatherDemo.propTypes = {
  classes: PropTypes.shape({
    types: PropTypes.string,
  }).isRequired,
};
export default withStyles(useStyles)(WeatherDemo);
