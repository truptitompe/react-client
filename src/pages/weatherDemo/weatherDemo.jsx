/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Paper, Grid } from '@material-ui/core';
import { NavBar, Chips } from '../../components';
import { CountryTable } from '../../components/Table';
import { SideBar } from '../../components/SideBar';
import {
  COUNTRIES,
  MEASUREMENTS,
  CITIES,
  PARAMETERS,
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
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  paper: {
    width: '80%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    color: 'red',
  },
});
class WeatherDemo extends Component {
  state = {
    rowsPerPage: 30,
    count: 1,
    sort: 'asc',
    page: 1,
    loading: false,
    limit: 100,
    countryData: [],
    open: false,
    orderBy: 'name',
    name: 'Select...',
    tableData: [],
    countryCode: '',
    coordinates: {},
    latestData: [],
    checkedData: [],
    parameters: [],
    selected: '',
    filteredData: [],
    tableError: {},
    geo: ['True', 'False'],
    searchCountry: '',
    selectGeo: [],
    chipData: [],
  };

  componentDidMount() {
    this.handleSet();
  }

  handleSet = () => {
    const token = localStorage.getItem('country');
    if (token) {
      this.handleDialogOpen();
    }
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
        countryData: err,
      });
    }
  };

  onChangePage = async (event, newPage) => {
    const measurements = MEASUREMENTS;
    const { page, countryCode } = this.state;
    this.setState({
      loading: true,
      page: newPage,
    });
    try {
      const res = await callApi({
        method: 'get',
        uri: `${measurements}`,
        params: {
          country: countryCode,
          limit: newPage * 100,
          page,
        },
      });
      this.setState({
        tableData: res.data.results,
        loading: false,
        selected: '',
      });
    } catch (err) {
      this.setState({
        loading: false,
        tableError: err,
      });
    }
  };

  // handle for change city in table
  handleChangeCity = (value, code) => async () => {
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
          tableData: res.data.results,
          count: res.data.meta.found,
          loading: false,
          selected: '',
        },
        this.handleCity,
      );
    } catch (err) {
      this.setState({
        loading: false,
        tableError: err,
      });
    }
  };

  // handle for filter city
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
        latestData: err,
      });
    }
  };

  // handle for parameters filter
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
        parameters: err,
      });
    }
  };

  // handle for radio
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
    this.handleChip();
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
      this.setState(
        {
          tableData: res.data.results,
          count: res.data.meta.found,
          loading: false,
        },
        this.handleChip,
      );
    } catch (err) {
      this.setState({
        loading: false,
        tableError: err,
      });
    }
  };

  // handle for checkbox
  handleChangeCheckbox = value => () => {
    this.setState({
      checkedData: [],
    });
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
    this.handleChip();
    const {
      limit,
      sort,
      page,
      checkedData,
      selected,
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
          city: selected,
          parameter: checkedData,
        },
      });
      this.setState({
        tableData: res.data.results,
        count: res.data.meta.found,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
        tableError: err,
      });
    }
  };

  handleGeo = async (event) => {
    this.setState(
      {
        selectGeo: event.target.value,
      },
      this.handleChangeGeo,
    );
  };

  handleChangeGeo = async () => {
    const measurements = MEASUREMENTS;
    this.handleChip();
    const {
      limit,
      sort,
      page,
      checkedData,
      selected,
      countryCode,
      selectGeo,
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
          city: selected,
          parameter: checkedData,
          has_geo: selectGeo,
        },
      });
      this.setState(
        {
          tableData: res.data.results,
          count: res.data.meta.found,
          loading: false,
        },
        this.handleChip,
      );
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  // handle for search country
  handleCountrySearch = (event) => {
    this.setState(
      {
        searchCountry: event.target.value.substring(0, 20),
      },
      this.handleSearch,
    );
  };

  handleSearch = () => {
    const { searchCountry, countryData, filteredData } = this.state;
    const data = countryData.filter(
      filterData => (filteredData.name || filterData.code)
        .toUpperCase()
        .indexOf(searchCountry) !== -1,
    );
    if (data.length >= 1) {
      this.setState({
        filteredData: data,
      });
    } else {
      this.setState({
        filteredData: 'country not match',
      });
    }
  };

  handleLocationSearch = (event) => {
    this.setState(
      {
        location: event.target.value,
      },
      this.handleChangeLocation,
    );
  };

  handleChangeLocation = async () => {
    const measurements = MEASUREMENTS;
    const {
      limit, sort, page, location, countryCode,
    } = this.state;
    try {
      const res = await callApi({
        method: 'get',
        uri: `${measurements}`,
        params: {
          country: countryCode,
          limit,
          sort,
          page,
          location,
        },
      });
      this.setState(
        {
          tableData: res.data.results,
          count: res.data.meta.found,
          loading: false,
        },
        this.handleLocation,
      );
    } catch (err) {
      this.setState({
        loading: false,
        tableData: err,
      });
    }
  };

  handleSort = (event, field) => {
    const { sort } = this.state;
    if (sort === 'desc') {
      this.setState({
        sort: 'asc',
        orderBy: field,
      });
    } else {
      this.setState({
        sort: 'desc',
        orderBy: field,
      });
    }
  };

  handleDelete = chipToDelete => () => {
    let { chipData } = this.state;
    const { latestData, checkedData } = this.state;
    let tempArr;
    if (checkedData !== undefined && checkedData.includes(chipToDelete)) {
      tempArr = checkedData.filter(data => data !== chipToDelete);
    }
    chipData = chipData.filter(chip => chip !== chipToDelete);

    latestData.forEach((key) => {
      if (key.city === chipToDelete) {
        this.setState({
          chipData,
          selected: '',
        });
      }
    });

    this.setState({
      chipData,
      checkedData: tempArr,
    }, () => {
      this.handleCheckbox();
    });
  };

  handleChip = () => {
    const { selected, checkedData, selectGeo } = this.state;
    let data = [];
    if (selected !== '' || checkedData !== '' || selectGeo !== '') {
      if (checkedData !== undefined) { data = [selected, ...checkedData]; }
      this.setState({
        chipData: data,
      });
    }
  };

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
      tableData,
      latestData,
      parameters,
      selected,
      location,
      filteredData,
      searchCountry,
      tableError,
      selectGeo,
      geo,
      chipData,
      checkedData,
      checkedValue,
    } = this.state;
    return (
      <div>
        <NavBar
          open={open}
          handleDialogOpen={this.handleDialogOpen}
          handleChangeCity={this.handleChangeCity}
          onClose={this.handleClose}
          countryData={countryData}
          name={name}
          searchCountry={searchCountry}
          location={location}
          handleCountrySearch={this.handleCountrySearch}
          handleLocationSearch={this.handleLocationSearch}
          orderBy={orderBy}
          filter={filteredData}
          sort={sort}
          page={page}
          loading={loading}
        />
        <Chips handleDelete={this.handleDelete} chipData={chipData} />
        <div className={classes.root}>
          <SideBar
            latestData={latestData}
            parameters={parameters}
            selected={selected}
            handleChangeRadio={this.handleChangeRadio}
            geo={geo}
            selectGeo={selectGeo}
            handleGeo={this.handleGeo}
            checkedData={checkedData}
            handleChangeCheckbox={this.handleChangeCheckbox}
            checkedValue={checkedValue}
          />

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
          >
            <Grid item>
              {tableData.length === 0 ? (
                <Paper className={classes.paper}>
                  {' '}
                  OOPS! There is no Data to Display
                </Paper>
              ) : (
                <CountryTable
                  id="id"
                  data={tableData}
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
                    },
                    {
                      field: 'parameter',
                      label: 'Parameter',
                      align: 'center',
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
                  onSort={this.handleSort}
                  sort={sort}
                  error={tableError}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  loading={loading}
                  dataLength={tableData.length}
                  onChangePage={this.onChangePage}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
WeatherDemo.propTypes = {
  classes: PropTypes.shape({
    types: PropTypes.string,
  }).isRequired,
};
export default withStyles(useStyles)(WeatherDemo);
