import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell,
  TableHead, TableRow, IconButton,
  TablePagination, Paper, TableSortLabel,
} from '@material-ui/core';
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
        columns, orderBy, order,
            } = this.props;
        const columnFields = columns.map(Column => (
            <TableCell align={Column.align}>
            <TableSortLabel
                active={orderBy === Column.field}
                direction={order}
                onClick={this.createSortHandler(Column.field)}
            >
                {Column.label || Column.field}
            </TableSortLabel>
            </TableCell>
        ));
        return columnFields;
        };
        // showRowData = id => () => {
        //   const { match, history } = this.props;
        //   return (
        //     history.push(`${match.url}/${id}`)
        //   );
        // };
render(){
        const rowData = [
            {
                city: 'abad',
                location: 'abad',
                parameter: 'jdkj',
                unit: 'hjdj',
                value: 'jdks',

            },
            {
                city: 'abad',
                location: 'abad',
                parameter: 'jdkj',
                unit: 'hjdj',
                value: 'jdks',

            },

        ]
        const {
            classes, columns,
            data, id, page,
            count, onChangePage,
            actions, rowsPerPage,
            loader, dataLength,
        } = this.props;
        // const rowData = Array.from(data);
        return (
            <Paper>
            <Table>
                <TableHead>
                <TableRow>{this.handlerColumn()}</TableRow>
                </TableHead>
                {rowData.map((row, index) => (
                <TableBody>
                    <TableRow hover style={{ cursor: 'pointer' }} selected={index % 2 === 0}>
                        {columns.map(items => (
                        <TableCell
                            align={items.align}
                        >
                            {(items.format) ? items.format(row[items.field]) : row[items.field]}
                            {
                            (items.field) === '' ? actions.map(icon => (
                                <IconButton onClick={event => icon.handler(event, row)}>
                                {icon.icon}
                                </IconButton>
                            )) : ''}
                        </TableCell>
                        ))}
                    </TableRow>
                    </TableBody>
                ))}
                </Table>
                <TablePagination
                    component="div"
                    // count={count}
                    // rowsPerPage={rowsPerPage}
                    // page={page}
                    // rowsPerPageOptions={[]}
                    // onChangePage={onChangePage}
                    // loader={loader}
                    // dataLength={dataLength}
                />
            </Paper>
        );
        }
}
export default CountryTable;