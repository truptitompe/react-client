import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { NavBar } from '../../components';
import { CountryTable } from '../../components/Table';
import { SideBar } from '../../components/SideBar';
import {
  COUNTRIES, MEASUREMENTS, CITIES, PARAMETERS,
} from '../../lib/utils/constants';
import { callApi } from '../../lib/utils/api';

const useStyles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',

  },
  table: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
class WeatherDemo extends Component {
  state = {
    rowsPerPage: 100,
    count: 1,
    sort: 'asc',
    page: 1,
    loading: false,
    limit: 100,
    countryData: [],
    open: false,
    orderBy: 'name',
    name: 'Select...',
    cityData: [],
    latestData: [],
    countryCode: '',
    coordinates: {},
    parameters: [],
  };

  handleDialogOpen = async () => {
    const {
      limit,
      sort, page, orderBy,
    } = this.state;
    this.setState({
      open: true,
      orderBy,
      limit,
      sort,
      page,
      loading: true,
    });
    const country = COUNTRIES;
    try {
      const res = await callApi({
        method: 'get',
        uri: `${country}`,
        params: {
          orderBy,
          limit,
          sort,
          page,
        },
      });
      this.setState({
        countryData: res.data.results,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  onChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  }

  handleChange = (value, code) => async () => {
    const measurements = MEASUREMENTS;
    const {
      limit, sort, page, coordinates, parameters,
    } = this.state;
    this.setState({
      loading: true,
      name: value,
      open: false,
      countryCode: code,
    });
    try {
      const res = await callApi({
        method: 'get',
        uri: `${measurements}`,
        params: {
          limit,
          country: code,
          orderBy: 'country',
          sort,
          page,
          coordinates,
          parameters,
        },
      });
      this.setState({
        cityData: res.data.results,
        loading: false,
      }, this.handleParameters);
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  handleCity = async () => {
    const cities = CITIES;
    const {
      limit, sort, page, countryCode,
    } = this.state;
    this.setState({
      loading: true,
      open: false,
    });
    try {
      const res = await callApi({
        method: 'get',
        uri: `${cities}`,
        params: {
          limit,
          country: countryCode,
          orderBy: 'country',
          sort,
          page,
        },
      });
      this.setState({
        latestData: res.data.results,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  handleParameters = async () => {
    const parameters = PARAMETERS;
    const {
      limit, sort, page, countryCode,
    } = this.state;
    this.setState({
      loading: true,
      open: false,
    });
    try {
      const res = await callApi({
        method: 'get',
        uri: `${parameters}`,
        params: {
          limit,
          country: countryCode,
          orderBy: ['preferredUnit', 'id'],
          sort,
          page,
        },
      });
      this.setState({
        parameters: res.data.results,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      rowsPerPage, open, name,
      count, sort, orderBy, page,
      loading, countryData, cityData, latestData, parameters,
    } = this.state;
    console.log("parameters", latestData, parameters);
    return (
      <>
        <NavBar
          open={open}
          handleDialogOpen={this.handleDialogOpen}
          handleChange={this.handleChange}
          onClose={this.handleClose}
          countryData={countryData}
          name={name}
          orderBy={orderBy}
          sort={sort}
          page={page}
          loading={loading}
        />
        <div className={classes.root}>
          <SideBar latestData={latestData} parameters={parameters} />
          <div className={classes.table}>
            { cityData.length === 0 ? ''
              : (
                <CountryTable
                  id="id"
                  data={cityData}
                  columns={[
                    {
                      field: 'city',
                      label: 'City',
                      align: 'center',
                    },
                    {
                      field: 'location',
                      label: 'Location',
                      align: 'center',
                    // format: value => value && value.toUpperCase(),
                    },
                    {
                      field: 'parameter',
                      label: 'Parameter',
                      align: 'center',
                    // format: this.getDateFormatted,
                    },
                    {
                      field: 'value',
                      label: 'Value',
                      align: 'center',
                    },
                    {
                      field: 'unit',
                      label: 'Unit',
                      align: 'center',
                    },
                  ]}
                  orderBy={orderBy}
                  count={count}
                  sort={sort}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  loading={loading}
                  onChangePage={this.onChangePage}
                />
              )
          }
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
