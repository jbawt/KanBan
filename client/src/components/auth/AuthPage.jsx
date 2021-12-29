import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Login from './login/Login';
import Register from './register/Register';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '91.85vh',
    backgroundColor: '#5abaa7',
    display: 'flex',
  },
  rightInfo: {
    width: '50%',
    height: '91.85vh',
    marginLeft: ''
  },
  title: {
    height: '15vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.3em'
  },
  rightTitle: {
    margin: 0,
  },
  info: {
    width: '50%',
    height: '60vh',
    border: '2px solid #5e5e5e',
    borderRadius: '5%',
    margin: '5% 0 0 25%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
})

function AuthPage() {

  const classes = useStyles();

  const [register, setRegister] = useState(false);

  return (
    <div className={classes.root}>

      { !register && <Login setRegister={setRegister} /> }

      { register && <Register setRegister={setRegister} /> }

      <div className={classes.rightInfo}>
        <div className={classes.title}>
          <h1 className={classes.rightTitle}>KanBan</h1>
          <h3 className={classes.rightTitle}>Organize your shit. In a fun way 🥳</h3>
        </div>
        <div className={classes.info}>

        </div>
      </div>
      
    </div>
  )
}

export default AuthPage
