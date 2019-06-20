// import React, { Component } from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// // import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import { fade, withStyles } from '@material-ui/core/styles';
// // import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// // import { CountryTable } from '../Table';
// import { Select, MenuItem, Dialog, DialogActions, DialogContentText, DialogContent, Button, CssBaseline } from '@material-ui/core';

// const useStyles = theme => ({
//   root: {
//     flexGrow: 1,
//     marginTop: theme.spacing(1),
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(100),
//       marginRight: theme.spacing(200),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     width: theme.spacing(10),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 3, 2, 15),
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: 400,
//       '&:focus': {
//         width: 400,
//       },
//     },
//   },
// });

// class NavBar extends Component {
//   state={
//     // country: '',
//     open: false,
//     // order: 'asc',
//     // orderBy: '',
//   }
//   handleChange = (event) =>{
//     this.setState({
//       country: event.target.value,
//     },this.handleClick)
//   }
//   handleDialogOpen = () => {
//     this.setState({
//       open: true,
//     })
//   }
//   handleClose = () => {
//     this.setState({
//       open: false,
//     })
//   }
//   handleClick = () => {
//     const { order, orderBy } = this.state;
//     console.log("handleClick");
//     return(<>
//     </>
// //     <CountryTable id="id"
// //     // data={data}
// //     columns={[
// //       {
// //         field: 'name',
// //         label: 'Name',
// //         align: 'center',
// //       },
// //       {
// //         field: 'email',
// //         label: 'Email Address',
// //         format: value => value && value.toUpperCase(),
// //       },
// //       {
// //         field: 'createdAt',
// //         label: 'Date',
// //         align: 'center',
// //         format: this.getDateFormatted,
// //       },
// //       {
// //         field: '',
// //         label: '',
// //       },
// //     ]}
// //     // actions={[
// //     //   {
// //     //     icon: <Edit />,
// //     //     handler: this.handlerEditDialogOpen,
// //     //   },
// //     //   {
// //     //     icon: <Delete />,
// //     //     handler: this.handlerDeleteDialogOpen,
// //     //   },
// //     // ]}
// //     orderBy={orderBy}
// //     order={order}
// //     // onSort={this.handleSort}
// //     // // onSelect={this.handleSelect}
// //     // // rowsPerPage={rowsPerPage}
// //     // // count={count}
// //     // page={page}
// //     // onChangePage={this.onChangePage}
// //     // loader={loading}
// //     // dataLength={data.length}
// // />
// );
// }
//   render(){
//   const { classes }  = this.props;
//   const { country, open } = this.state;
  
//   return (
//     <React.Fragment>
//     <CssBaseline />
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography className={classes.title} variant="h4" noWrap>
//             Weather API
//           </Typography>
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Searching by Location...."
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ 'aria-label': 'Search' }}
//             />
//           </div>
//           <Select
//             disableUnderline
//             className={classes.menuButton}
//             // value={country}
//             // onChange={this.handleChange}
//             onClick={this.handleDialogOpen}
//             // input={<Input id="select-multiple-placeholder" />}
//             // renderValue={selected => {
//             //   if (selected.length === 0) {
//             //     return <em>Select...</em>;
//             //   }
  
//             //   return selected.join(', ');
//             // }}
//             // MenuProps={MenuProps}
//           >
//           <Dialog
//         open={open}
//         onClose={this.handleClose}
//         aria-labelledby="scroll-dialog-title"
//       >
//         {/* <DialogTitle id="scroll-dialog-title"></DialogTitle> */}
//         <DialogContent>
//           <DialogContentText>
//             <MenuItem value="">
//               <em>Select...</em>
//             </MenuItem>
//             <MenuItem value="">
//               <em>Select...</em>
//             </MenuItem>
//             {/* {names.map(name => (
//               <MenuItem key={name} value={name}>
//                 {name}
//               </MenuItem>
//             ))} */}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={this.handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={this.handleClose} color="primary">
//             Subscribe
//           </Button>
//         </DialogActions>
//       </Dialog>
            
//           </Select>
//         </Toolbar>
//       </AppBar>
//     </div>
//     </React.Fragment>
//   );
// }
// }

// export default withStyles(useStyles)(NavBar);
import React from 'react';
import { withStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { PropTypes } from 'prop-types';
// import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search'
import CssBaseline from '@material-ui/core/CssBaseline';
import { InputBase, DialogContent, DialogContentText, Select, Dialog, MenuItem, DialogActions } from '@material-ui/core';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2),
  },
  search: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '50%',
        marginLeft: theme.spacing(20)
      },
      searchIcon: {
        width: theme.spacing(10),
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(-10),
        marginLeft: theme.spacing(2)
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 3, 2, 15),
        width: '100%',
      },
  select: {
    flexGrow: 1,
    width: '0%',
  }
});

class NavBar extends React.Component {
state={
        // country: '',
        open: false,
        // order: 'asc',
        // orderBy: '',
      }
handleDialogOpen = () => {
            this.setState({
              open: true,
            })
          }
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                TRAINEE PORTAL
              </Typography>
              <div className={classes.search}>
            <div className={classes.searchIcon}>
            <SearchIcon />
             </div>
             <InputBase
              placeholder="Searching by Location...."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
          <Select
            disableUnderline
            className={classes.select}
            // value={country}
            // onChange={this.handleChange}
            onClick={this.handleDialogOpen}
            // input={<Input id="select-multiple-placeholder" />}
            // renderValue={selected => {
            //   if (selected.length === 0) {
            //     return <em>Select...</em>;
            //   }
  
            //   return selected.join(', ');
            // }}
            // MenuProps={MenuProps}
          >
        <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="scroll-dialog-title"
      >
        {/* <DialogTitle id="scroll-dialog-title"></DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            {/* <em>Select...</em> */}
            <MenuItem value="">
              <em>Select...</em>
            </MenuItem>
            {/* {names.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
            
          </Select>
            </Toolbar>
          </AppBar>
        </div>
      </React.Fragment>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.shape({
    types: PropTypes.string,
  }).isRequired,
};
export default withStyles(useStyles)(NavBar);