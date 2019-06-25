/* eslint-disable max-len */
import React from 'react';
import { withStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { PropTypes } from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  InputBase, DialogContent, Dialog, DialogActions, DialogContentText, TextField, InputAdornment, Button, CircularProgress,
} from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

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
    marginLeft: theme.spacing(20),
  },
  searchIcon: {
    width: theme.spacing(10),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(-10),
    marginLeft: theme.spacing(2),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 3, 2, 15),
    width: '100%',
  },
  select: {
    marginLeft: theme.spacing(100),
    width: '10%',
  },
  button: {
    marginBottom: theme.spacing(10),
    marginLeft: theme.spacing(10),
  },
});

class NavBar extends React.Component {
  render() {
    const {
      classes, handleChange,
      handleDialogOpen,
      open, countryData,
      name, loading,
    } = this.props;
    const countryList = Array.from(countryData);
    localStorage.setItem('country', name);
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                WEATHER API
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
              <TextField
                className={classes.select}
                value={name}
                onClick={handleDialogOpen}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <KeyboardArrowDown />
                    </InputAdornment>
                  ),
                }}
              />
              <Dialog
                open={open}
              >
                <DialogContent>
                  <DialogActions>
                    {loading ? <CircularProgress /> : ''}
                    <DialogContentText>
                      {countryList.map(items => (
                        <Button variant="outlined" key={items.code} value={items.name} className={classes.button} onClick={handleChange(items.name, items.code)}>
                          {items.name}
                        </Button>
                      ))}
                    </DialogContentText>
                  </DialogActions>
                </DialogContent>
              </Dialog>
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
  handleChange: PropTypes.func.isRequired,
  handleDialogOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  countryData: PropTypes.arrayOf(
    PropTypes.shape({
      types: PropTypes.string,
    }),
  ).isRequired,
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,


};
export default withStyles(useStyles)(NavBar);
