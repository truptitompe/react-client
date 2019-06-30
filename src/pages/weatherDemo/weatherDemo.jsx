/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { NavBar } from '../../components';
import { CountryTable } from '../../components/Table';
import { SideBar } from '../../components/SideBar';
import { COUNTRIES, MEASUREMENTS, CITIES, PARAMETERS, LATEST } from '../../lib/utils/constants';
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
		filteredData: [],
		locationData: [],
		location: '',
		locations: [],
		geo: [],
		// cityError: '',
		// countryError: '',
		// latetDataError: '',
		// parameterError: '',
		// checkboxError: '',
		// radioError: '',
		// searchError: '',
		// locationError: '',
		searchCountry: '',
	};

	componentWillMount() {
		this.handleSet();
	}

	handleSet = () => {
		const token = localStorage.getItem('country');
		if (token) {
			this.handleDialogOpen();
		}
	};

	handleDialogOpen = async () => {
		const { limit, sort, page, orderBy } = this.state;
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
				countryData: err.message,
			});
		}
	};

	onChangePage = (event, newPage) => {
		this.setState({
			page: newPage,
		});
	};

	// handle for chnage city in table
	handleChangeCity = (value, code) => async () => {
		const measurements = MEASUREMENTS;
		const { limit, sort, page, coordinates, parameters } = this.state;
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
				this.handleCity
			);
		} catch (err) {
			this.setState({
				loading: false,
				cityData: err.message,
			});
		}
	};

	// handle for filter city
	handleCity = async () => {
		const cities = CITIES;
		const { limit, sort, page, countryCode } = this.state;
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
				latestData: err.message,
			});
		}
	};

	// handle for parameters filter
	handleParameters = async () => {
		const { limit, sort, page, countryCode } = this.state;
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
				parameters: err.message,
			});
		}
	};

	// handle for radio
	handleChangeRadio = async event => {
		this.setState(
			{
				selected: event.target.value,
			},
			this.handleRadio
		);
	};

	handleRadio = async () => {
		const measurements = MEASUREMENTS;
		const { limit, sort, page, coordinates, parameters, countryCode, selected } = this.state;
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
				latestCity: err.message,
			});
		}
	};

	// handle for checkbox
	handleChangeCheckbox = value => () => {
		let { checkedData } = this.state;
		if (checkedData.filter(data => value === data).length) {
			checkedData = checkedData.filter(data => value !== data);
		} else {
			checkedData.push(value);
		}
		this.setState(
			{
				checkedData,
			},
			this.handleCheckbox
		);
	};

	handleCheckbox = async () => {
		const measurements = MEASUREMENTS;
		const { limit, sort, page, checkedData, selected, countryCode } = this.state;
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
				parametersData: res.data.results,
				loading: false,
			});
		} catch (err) {
			this.setState({
				loading: false,
				parametersData: err.message,
			});
		}
	};

	// handleCheckboxHasGeo = () => {
	// 	let { checkedData } = this.state;
	// 	if (checkedData.filter(data => value === data).length) {
	// 		checkedData = checkedData.filter(data => value !== data);
	// 	} else {
	// 		checkedData.push(value);
	// 	}
	// 	this.setState(
	// 		{
	// 			checkedData,
	// 		},
	// 		this.handleCheckbox
	// 	);
	// };

	// handleChangeGeo = async () => {
	// 	const measurements = MEASUREMENTS;
	// 	const { limit, sort, page, checkedData, selected, countryCode } = this.state;
	// 	try {
	// 		const res = await callApi({
	// 			method: 'get',
	// 			uri: `${measurements}`,
	// 			params: {
	// 				limit,
	// 				country: countryCode,
	// 				sort,
	// 				page,
	// 				city: selected,
	// 				parameter: checkedData,
	// 			},
	// 		});
	// 		this.setState({
	// 			geoData: res.data.results,
	// 			loading: false,
	// 		});
	// 	} catch (err) {
	// 		this.setState({
	// 			loading: false,
	// 		});
	// 	}
	// };

	// // handle for geo location
	// handleGeo = async () => {
	// 	const latest = LATEST;
	// 	const { sort, page, countryCode, selected, coordinates } = this.state;
	// 	this.setState({
	// 		loading: true,
	// 		open: false,
	// 	});
	// 	try {
	// 		const res = await callApi({
	// 			method: 'get',
	// 			uri: `${latest}`,
	// 			params: {
	// 				country: countryCode,
	// 				orderBy: ['country', 'city'],
	// 				city: selected,
	// 				coordinates,
	// 				sort,
	// 				page,
	// 			},
	// 		});
	// 		this.setState({
	// 			: res.data.results,
	// 			loading: false,
	// 			selected: '',
	// 		});
	// 	} catch (err) {
	// 		this.setState({
	// 			loading: false,
	// 		});
	// 	}
	// };

	// handle for search country
	handleCountrySearch = event => {
		this.setState(
			{
				searchCountry: event.target.value.substring(0, 20),
			},
			this.handleSearch
		);
	};

	handleSearch = () => {
		const { searchCountry, countryData, filteredData } = this.state;
		const data = countryData.filter(
			filterData => (filteredData.name || filterData.code).toUpperCase().indexOf(searchCountry) !== -1
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

	handleLocationSearch = event => {
		this.setState(
			{
				location: event.target.value.substring(0, 20),
			},
			this.handleLocation
		);
	};

	handleLocation = async Props => {
		const latest = LATEST;
		const { limit, sort, page, countryCode, selected, location } = this.state;
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
					country: [countryCode],
					orderBy: ['count', 'country', 'location'],
					sort,
					city: [selected],
					page,
					location,
				},
			});
			this.setState({
				locationData: res.data.results,
				loading: false,
				selected: '',
			});
		} catch (err) {
			this.setState({
				loading: false,
				locationData: err.message,
			});
		}
	};

	handleChangeLocation = async () => {
		const measurements = MEASUREMENTS;
		const { limit, sort, page, locationData } = this.state;
		try {
			const res = await callApi({
				method: 'get',
				uri: `${measurements}`,
				params: {
					limit,
					sort,
					page,
					location: locationData,
				},
			});
			this.setState(
				{
					locations: res.data.results,
					loading: false,
				},
				this.handleLocation
			);
		} catch (err) {
			this.setState({
				loading: false,
				locations: err.message,
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
			cityData,
			latestData,
			parameters,
			parametersData,
			selected,
			location,
			filteredData,
			latestCity,
			locations,
			searchCountry,
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
				<div className={classes.root}>
					<SideBar
						latestData={latestData}
						parameters={parameters}
						selected={selected}
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
								locations={locations}
								parametersData={parametersData}
								onChangePage={this.onChangePage}
							/>
						)}
					</div>
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
