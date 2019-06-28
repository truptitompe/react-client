/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell,
  TableHead, TableRow,
  TablePagination, Paper, TableSortLabel,
} from '@material-ui/core';
import PropTypes from 'prop-types';
// import { withLoaderAndMessage } from '../../../../components';

class CountryTable extends Component {
createSortHandler = field => (event) => {
  // const { onSort } = this.props;
  // onSort(event, field);
}

handlerColumn = () => {
  const {
    columns, orderBy, sort,
  } = this.props;
  const columnFields = columns.map(Column => (
    <TableCell align={Column.align}>
      <TableSortLabel
        active={orderBy === Column.field}
        direction={sort}
        onClick={this.createSortHandler(Column.field)}
      >
        {Column.label || Column.field}
      </TableSortLabel>
    </TableCell>
  ));
  return columnFields;
};

render() {
  const {
    columns,
    data, page,
    count,
    rowsPerPage,
    loading, onChangePage, latestCity, selected, parametersData, locationData,
  } = this.props;
  const rowData = Array.from(data);
  const cityArray = Array.from(latestCity);
  const parametersArray = Array.from(parametersData);
  const locationArray = Array.from(locationData);
  let toggle = [];
  toggle = ((selected === '') ? rowData || locationArray : cityArray || parametersArray);
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>{this.handlerColumn()}</TableRow>
        </TableHead>
        {
          toggle.map((row, index) => (
            <TableBody>
              <TableRow hover style={{ cursor: 'pointer' }} selected={index % 2 === 0}>
                {columns.map(items => (
                  <TableCell
                    align={items.align}
                  >
                    {(items.format) ? items.format(row[items.field]) : row[items.field]}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          ))}
      </Table>
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={[]}
        loading={loading}
        // dataLength={dataLength}
        onChangePage={onChangePage}
      />
    </Paper>
  );
}
}
CountryTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      types: PropTypes.string,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      types: PropTypes.string,
    }),
  ).isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  // dataLength: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     types: PropTypes.string,
  //   }),
  // ).isRequired,
  onChangePage: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  latestCity: PropTypes.arrayOf(
    PropTypes.shape({
      types: PropTypes.string,
    }),
  ).isRequired,
  // onSort: PropTypes.func.isRequired,
};
export default CountryTable;
