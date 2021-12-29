import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: ({ width }) => width,
    height: ({ height }) => height,
    backgroundColor: ({ bgColor }) => bgColor,
    color: ({ color }) => color,
    fontSize: ({ fontSize }) => `${fontSize}em`,
    border: ({ borColor, borThic }) => `${borThic}px solid ${borColor}`,
    borderRadius: ({ borRad }) => `${borRad}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  disabled: {
    width: ({ width }) => width,
    height: ({ height }) => height,
    backgroundColor: '#8c8c8c',
    color: ({ color }) => color,
    fontSize: ({ fontSize }) => `${fontSize}em`,
    border: ({ borColor, borThic }) => `${borThic}px solid ${borColor}`,
    borderRadius: ({ borRad }) => `${borRad}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

function Button(props) {

  const classes = useStyles(props);

  return (
    <div onClick={props.disabled ? () => {} : props.onClick} className={`${props.disabled ? classes.disabled : classes.root}`}>
      { props.text }
    </div>
  )
}

Button.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
  borThic: PropTypes.number.isRequired,
  borRad: PropTypes.number.isRequired,
  borColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string
}

export default Button
