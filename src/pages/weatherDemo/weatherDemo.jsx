/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { NavBar } from '../../components';
import { CountryTable } from '../../components/Table';
import { SideBar } from '../../components/SideBar';
import {
  COUNTRIES,
  MEASUREMENTS,
  CITIES,
  PARAMETERS,
  LATEST,
} from '../../lib/utils/constants';
import { callApi } from '../../lib/utils/api';

const useStyles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flex: 2,
  },
  table: {
    flex: 1,
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
    selected: '',
    checkedData: [],
    parametersData: [],
    latestCity: [],
    location: '',
    geo: [],
    search: [],
  };

  handleDialogOpen = async () => {
    const {
      limit, sort, page, orderBy,
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
        selected: '',
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  onChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

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
          orderBy: ['date', 'value', 'parameter'],
          sort,
          page,
          coordinates,
          parameters,
        },
      });
      this.setState(
        {
          cityData: res.data.results,
          loading: false,
          selected: '',
        },
        this.handleCity,
      );
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  handleCity = async () => {
    const cities = CITIES;
    const {
      limit, sort, page, countryCode,
    } = this.state;
    this.setState({
      loading: true,
      open: false,
    });
    this.handleParameters();
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
        selected: '',
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  handleParameters = async () => {
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
        uri: `${PARAMETERS}`,
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
        selected: '',
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  handleChangeRadio = async (event) => {
    this.setState(
      {
        selected: event.target.value,
      },
      this.handleRadio,
    );
  };

  handleRadio = async () => {
    const measurements = MEASUREMENTS;
    const {
      limit,
      sort,
      page,
      coordinates,
      parameters,
      countryCode,
      selected,
    } = this.state;
    try {
      const res = await callApi({
        method: 'get',
        uri: `${measurements}`,
        params: {
          limit,
          country: countryCode,
          orderBy: 'country',
          sort,
          city: selected,
          page,
          coordinates,
          parameters,
        },
      });
      this.setState({
        latestCity: res.data.results,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  handleChangeCheckbox = value => () => {
    let { checkedData } = this.state;
    if (checkedData.filter(data => value === data).length) {
      checkedData = checkedData.filter(data => value !== data);
    } else {
      checkedData.push(value);
    }
    this.setState({
      checkedData,
    }, this.handleCheckbox);
  };

  handleCheckbox = async () => {
    const measurements = MEASUREMENTS;
    const {
      limit,
      sort,
      page,
      checkedData,
      countryCode,
    } = this.state;
    try {
      const res = await callApi({
        method: 'get',
        uri: `${measurements}`,
        params: {
          limit,
          country: countryCode,
          sort,
          page,
          parameters: checkedData,
        },
      });
      console.log('response', res);
      this.setState({
        parametersData: res.data.results,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }


  handleGeo = async () => {
    const latest = LATEST;
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
        uri: `${latest}`,
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
        selected: '',
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  handleUpdateSearch = (event) => {
    // this.setState({
    //   search: event.target.value.substr(0, 20),
    // }, this.handleSearch);
  }

  // handleSearch = () => {
  //   const { search, countryData } = this.search;
  //   console.log("countryData", countryData);
  //   const filteredData = countryData.filter(filterData => filterData.name.indexOf(search) !== -1);
  //   console.log("filteredData", filteredData);
  //   return filteredData;
  // };

  render() {
    const { classes } = this.props;
    const {
      rowsPerPage,
      open,
      name,
      count,
      sort,
      orderBy,
      page,
      loading,
      countryData,
      cityData,
      latestData,
      parameters,
      parametersData,
      selected,
      filteredData,
      latestCity,
      search,
    } = this.state;
    console.log('checked', parametersData);
    // console.log('checked', filteredData);

    return (
      <>
        <NavBar
          open={open}
          handleDialogOpen={this.handleDialogOpen}
          handleChange={this.handleChange}
          onClose={this.handleClose}
          countryData={countryData}
          name={name}
          search={search}
          handleUpdateSearch={this.handleUpdateSearch}
          orderBy={orderBy}
          filteredData={filteredData}
          sort={sort}
          page={page}
          loading={loading}
        />
        <div className={classes.root}>
          <SideBar
            latestData={latestData}
            parameters={parameters}
            selected={selected}
            // checked={checkedData}
            handleChangeRadio={this.handleChangeRadio}
            handleChangeCheckbox={this.handleChangeCheckbox}
          />
          <div className={classes.table}>
            {cityData.length === 0 ? (
              ''
            ) : (
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
                selected={selected}
                sort={sort}
                rowsPerPage={rowsPerPage}
                page={page}
                latestCity={latestCity}
                loading={loading}
                onChangePage={this.onChangePage}
              />
            )}
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
