/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

import {
  Radio, FormControl, RadioGroup, FormControlLabel, FormGroup, Checkbox,
} from '@material-ui/core';

const drawerWidth = 'auto';

const useStyles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
});

class SideBar extends Component {
  render() {
    const {
      classes,
      latestData,
      parameters,
      selected,
      handleChangeRadio,
	  handleChangeCheckbox,
	  geo,
    } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Paper
          className={classes.drawer}
          variant="permanent"
          classes={{
					  paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>

            <ListItem>
              <ListItemText primary="Has Geo" />
            </ListItem>
            {/* { geo.map(geoValue => ( */}
            <ListItem>
              <FormControl>
                <FormGroup name="checkbox" onChange={handleChangeCheckbox}>
                  {/* <FormControlLabel
                    value={checked}
                    control={<Checkbox color="primary" />}
                    label={checked}
                  /> */}
                </FormGroup>
              </FormControl>
            </ListItem>
            {/* ))} */}
            <ListItem>
              <ListItemText primary="City" />
            </ListItem>
            {latestData.map(items => (
              <ListItem>
                <FormControl>
                  <RadioGroup name="radio" value={selected} onChange={handleChangeRadio}>
                    <FormControlLabel value={items.city} control={<Radio />} label={items.city} />
                  </RadioGroup>
                </FormControl>
              </ListItem>
            ))}
            <ListItem>
              <ListItemText primary="Parameters" />
            </ListItem>
            {parameters.map(key => (
              <ListItem>
                <FormControl>
                  <FormGroup>
                    <FormControlLabel
                      value={key.name}
                      onChange={handleChangeCheckbox(key.id)}
                      control={<Checkbox color="primary" />}
                      label={key.name}
                    />
                  </FormGroup>
                </FormControl>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}
SideBar.propTypes = {
  classes: PropTypes.shape({
    types: PropTypes.string,
  }).isRequired,
  latestData: PropTypes.arrayOf(
    PropTypes.shape({
      types: PropTypes.string,
    }),
  ).isRequired,
  handleChangeRadio: PropTypes.func.isRequired,
  handleChangeCheckbox: PropTypes.func.isRequired,
  parameters: PropTypes.arrayOf(
    PropTypes.shape({
      types: PropTypes.string,
    }),
  ).isRequired,
  selected: PropTypes.string.isRequired,
  checked: PropTypes.string.isRequired,
};
export default withStyles(useStyles)(SideBar);
