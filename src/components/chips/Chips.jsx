import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const useStyles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
});

class Chips extends React.Component {
  render() {
    const {
      classes, handleDelete,
      chipData,
    } = this.props;
    return (
      <Paper className={classes.root}>
        {chipData.map(data => (
          <Chip
            key={data}
            label={data}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        ))}
      </Paper>
    );
  }
}
Chips.propTypes = {
  classes: PropTypes.shape({
    types: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  chipData: PropTypes.arrayOf(
    PropTypes.shape({
      types: PropTypes.string,
    }),
  ).isRequired,
};
export default withStyles(useStyles)(Chips);
