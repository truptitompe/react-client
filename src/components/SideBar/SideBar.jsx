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
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@material-ui/core';

const drawerWidth = 'auto';
const drawerHeight = '10%';

const useStyles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
  },
  drawer: {
    width: drawerWidth,
    height: drawerHeight,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: drawerHeight,
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
      handleGeo,
      selectGeo,
      checkedData,
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
          <List>
            <Paper>
              <ListItem>
                <ListItemText primary="Has Geo" />
              </ListItem>
              <Divider />
              {geo.map(geoValue => (
                <ListItem>
                  <FormControl>
                    <RadioGroup name="geo" value={selectGeo} onChange={handleGeo}>
                      <FormControlLabel
                        value={geoValue}
                        control={<Radio />}
                        label={geoValue}
                      />
                    </RadioGroup>
                  </FormControl>
                </ListItem>

              ))}
            </Paper>
            <Paper style={{ width: 200, height: 500, overflow: 'scroll' }}>
              <ListItem>
                <ListItemText primary="City" />
              </ListItem>
              <Divider />
              {latestData.map(items => (
                <ListItem>
                  <FormControl>
                    <RadioGroup
                      name="radio"
                      value={selected}
                      onChange={handleChangeRadio}
                    >
                      <FormControlLabel
                        value={items.city}
                        control={<Radio />}
                        label={items.city}
                      />
                    </RadioGroup>
                  </FormControl>
                </ListItem>
              ))}
            </Paper>
            <Paper>
              <ListItem>
                <ListItemText primary="Parameters" />
              </ListItem>
              <Divider />
              {parameters.map(key => (
                <ListItem>
                  <FormControl>
                    <FormGroup>
                      <FormControlLabel
                        checked={checkedData !== undefined && checkedData.includes(key.id)}
                        value={key.id}
                        onChange={handleChangeCheckbox(key.id)}
                        control={<Checkbox color="primary" />}
                        label={key.name}
                      />
                    </FormGroup>
                  </FormControl>
                </ListItem>
              ))}
            </Paper>
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
  geo: PropTypes.arrayOf(
    PropTypes.shape({
      types: PropTypes.string,
    }),
  ).isRequired,
  handleGeo: PropTypes.func.isRequired,
  selectGeo: PropTypes.bool.isRequired,
  checkedData: PropTypes.arrayOf(
    PropTypes.shape({
      types: PropTypes.string,
    }),
  ).isRequired,
};
export default withStyles(useStyles)(SideBar);
