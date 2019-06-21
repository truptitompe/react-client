import React, { Component } from 'react';

import { NavBar } from '../../components';
import { CountryTable } from '../../components/Table';
import { SideBar } from '../../components/SideBar';
import { withStyles } from '@material-ui/styles';

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        
    },
    table: {
        marginLeft: theme.spacing(20),
        padding: theme.spacing(100),
    }

})
class WeatherDemo extends Component {
    render(){
        const { classes } = this.props;
        return(
            <>
                <NavBar />
                <div className={classes.root}>
                <SideBar  />
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
    // actions={[
    //   {
    //     icon: <Edit />,
    //     handler: this.handlerEditDialogOpen,
    //   },
    //   {
    //     icon: <Delete />,
    //     handler: this.handlerDeleteDialogOpen,
    //   },
    // ]}
    // orderBy={orderBy}
    // order={order}
    // onSort={this.handleSort}
    // // onSelect={this.handleSelect}
    // // rowsPerPage={rowsPerPage}
    // // count={count}
    // page={page}
    // onChangePage={this.onChangePage}
    // loader={loading}
    // dataLength={data.length}
/>
</div>
</div>
        </>
        )
    }
}
export default withStyles(useStyles)(WeatherDemo);