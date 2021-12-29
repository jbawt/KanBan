import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '50%',
    borderRadius: '10px',
    border: '2px solid #5e5e5e',
    outline: 'none',
    fontSize: '1.2em',
    padding: '1%',
  }
})

function SearchBar(props) {

  const classes = useStyles();

  return (
    <input
      className={classes.root}
      type="search"
      placeholder="Search Projects"
    />
  )
}

export default SearchBar
