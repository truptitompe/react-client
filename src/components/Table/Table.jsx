import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell,
  TableHead, TableRow,
  TablePagination, Paper, TableSortLabel,
} from '@material-ui/core';
import { callApi } from '../../lib/utils/api';
import { LATEST } from '../../lib/utils/constants';
// import PropTypes from 'prop-types';
// import { withLoaderAndMessage } from '../../../../components';


// const useStyles = theme => ({
//     root: {
//       width: '100%',
//       marginTop: theme.spacing(3),
//       overflowX: 'auto',
//       flexShrink: 0,
//       color: theme.palette.text.secondary,
//       marginLeft: theme.spacing(2.5),
//     },
//     table: {
//       minWidth: 650,
//     },
//     link: {
//       color: 'black',
//       textDecoration: 'none',
//     },
//     progress: {
//       margin: theme.spacing(2),
//     },
//   });

class CountryTable extends Component {
createSortHandler = field => (event) => {
  const { onSort } = this.props;
  onSort(event, field);
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

showRowData = city => async (event, newPage) => {
  const latest = LATEST;
  const {
    limit, orderBy, sort,
  } = this.state;
  this.setState({
    page: newPage,
    orderBy,
    limit,
    loading: true,
    sort,
  });
  try {
    const res = await callApi({
      method: 'get',
      uri: `${latest}`,
      params: {
        limit,
        city,
        orderBy: 'location',
        sort,
      },
    });
    console.log('response', res);
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

render() {
  const {
    columns,
    data, page,
    count,
    rowsPerPage,
    loader, dataLength, showRowData,
  } = this.props;
  const rowData = Array.from(data);
  //   const latestList = Array.from(latestData);
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>{this.handlerColumn()}</TableRow>
        </TableHead>
        {
          rowData.map((row, index) => (
            <TableBody>
              <TableRow hover style={{ cursor: 'pointer' }} selected={index % 2 === 0} onClick={this.showRowData(row.city)}>
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
        loader={loader}
        dataLength={dataLength}
      />
    </Paper>
  );
}
}
export default CountryTable;
