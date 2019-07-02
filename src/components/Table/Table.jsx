/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableSortLabel,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withLoader } from '../../HOC';

class CountryTable extends Component {
  createSortHandler = field => (event) => {
    const { onSort } = this.props;
    onSort(event, field);
  };

  handlerColumn = () => {
    const { columns, orderBy, sort } = this.props;
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

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getSorting = (sort, orderBy) => (sort === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy))

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  render() {
    const {
      columns,
      data,
      page,
      count,
      rowsPerPage,
      loading,
      onChangePage,
      dataLength,
      error,
      sort,
      orderBy,
    } = this.props;
    const rowData = Array.from(data);
    return (
      <React.Fragment>
        <Paper>
          {(error === '') ? (
            <Paper>{error.message}</Paper>
          ) : (
            <div>
              <Table>
                <TableHead>
                  <TableRow>{this.handlerColumn()}</TableRow>
                </TableHead>
                <TableBody>
                  {this.stableSort(rowData, this.getSorting(sort, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        hover
                        style={{ cursor: 'pointer' }}
                        selected={index % 2 === 0}
                      >
                        {columns.map(items => (
                          <TableCell align={items.align}>
                            {items.format
                              ? items.format(row[items.field])
                              : row[items.field]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>

              </Table>
              <TablePagination
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                rowsPerPageOptions={[]}
                loading={loading}
                dataLength={dataLength}
                onChangePage={onChangePage}
              />
            </div>
          )}
        </Paper>
      </React.Fragment>
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
  dataLength: PropTypes.arrayOf(
    PropTypes.shape({
      types: PropTypes.string,
    }),
  ).isRequired,
  onChangePage: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  error: PropTypes.shape({
    types: PropTypes.string,
  }).isRequired,
  onSort: PropTypes.func.isRequired,
};
export default withLoader(CountryTable);
