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
  Radio, FormControl,
  RadioGroup, FormControlLabel, FormGroup, Checkbox,
} from '@material-ui/core';

const drawerWidth = 'auto';

const useStyles = theme => ({
  root: {
    display: 'flex',
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
  state = {
    selected: '',
    checked: '',
  }

  handleChange = (event) => {
    this.setState({
      selected: event.target.value,
      checked: event.target.value,
    });
  }

  render() {
    const {
      classes, latestData,
      parameters, checked,
    } = this.props;
    const { selected } = this.state;
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
            <ListItem radio>
              <ListItemText primary="Has Geo" />
            </ListItem>
            <ListItem>
              <ListItemText primary="City" />
            </ListItem>
            {latestData.map(items => (
              <ListItem>
                <FormControl>
                  <RadioGroup
                    name="radio"
                    value={selected}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel value={items.city} control={<Radio />} label={items.city} />
                  </RadioGroup>
                </FormControl>
              </ListItem>
            ))}
            <ListItem>
              <ListItemText primary="Parameters" />
            </ListItem>
            { parameters.map(item => (
              <ListItem>
                <FormControl>
                  <FormGroup name="checkbox" value={checked} onChange={this.handleChange}>
                    <FormControlLabel
                      value={item.name}
                      control={<Checkbox color="primary" />}
                      label={item.name}
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
};
export default withStyles(useStyles)(SideBar);
