import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { NavBar } from '../../components';
import { CountryTable } from '../../components/Table';
import { SideBar } from '../../components/SideBar';
import { LATEST, COUNTRIES, CITIES } from '../../lib/utils/constants';
import { callApi } from '../../lib/utils/api';

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',

  },
  table: {
    marginLeft: theme.spacing(200),
    padding: theme.spacing(0),
  },

});
class WeatherDemo extends Component {
  state = {
    rowsPerPage: 100,
    count: 0,
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
      console.log('response', res);
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

  handleChange = (value, code) => async (event, newPage) => {
    const cities = CITIES;
    const {
      limit, orderBy, sort,
    } = this.state;
    this.setState({
      page: newPage,
      orderBy,
      limit,
      loading: true,
      name: value,
      sort,
      open: false,
    });
    try {
      const res = await callApi({
        method: 'get',
        uri: `${cities}`,
        params: {
          limit,
          country: code,
          orderBy: 'country',
          sort,
        },
      });
      this.setState({
        cityData: res.data.results,
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
      count, sort, orderBy, page, loading, countryData, cityData, latestData,
    } = this.state;
    console.log('citydata', cityData);
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
          <SideBar />
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
                  ]}
                  orderBy={orderBy}
                  count={count}
                  sort={sort}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  loader={loading}
                />
              )
          }
          </div>
          <div className={classes.table}>
            { latestData.length === 0 ? ''
              : (
                <CountryTable
                  id="id"
                  latestData={latestData}
                  columns={[
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
                  showRowData={this.showRowData()}
              // onChangePage={this.onChangePage}
                  loader={loading}
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
