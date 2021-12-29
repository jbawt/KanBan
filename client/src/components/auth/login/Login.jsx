import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Button from '../../uiComponents/Button'
import { useUpdateUserContext } from '../../../context/userProvider';
import { login } from '../../../helpers/login';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const useStyles = makeStyles({
  root: {
    width: '50%',
    height: '91.85vh',
    backgroundColor: 'white',
    borderRight: '2px solid #5e5e5e'
  },
  title: {
    height: '15vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.3em'
  },
  form: {
    width: '50%',
    height: '40vh',
    border: '2px solid #5e5e5e',
    borderRadius: '5%',
    margin: '5% 0 0 25%',
    backgroundColor: '#5abaa7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputs: {
    width: '60%',
    height: '55%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    position: 'relative',
    top: '10%',
  },
  btns: {
    display:'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
    height: '20%',
  }
})

export default function Login({ setRegister }) {

  const classes = useStyles();
  const updateUser = useUpdateUserContext();
  const history = useHistory();
  const [errorText, setErrorText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [togglePass, setTogglePass] = useState(false);
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: '',
    password: '',
  })

  const handleRegisterClick = () => setRegister(true);

  const handleUserUpdate = (e, inputType) => {

    setErrorText("");
    setEmailError(false);
    setPassError(false);

    if (inputType === 'email') {

      setUserLoginInfo({
        ...userLoginInfo,
        email: e.target.value
      });

    } else if (inputType === 'password') {

      setUserLoginInfo({
        ...userLoginInfo,
        password: e.target.value
      });

    }

  }

  const handleEnterLogin = (e) => {
    if (e.key === "Enter") {
      login(userLoginInfo, history, updateUser, setErrorText, setEmailError, setPassError);  
    }
  }

  const handleLogin = () => {

    login(userLoginInfo, history, updateUser, setErrorText, setEmailError, setPassError);

  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h1>Login</h1>
      </div>

      <div className={classes.form}>
        <div className={classes.inputs}>
          <TextField 
            onChange={(e) => handleUserUpdate(e, 'email')} 
            className={classes.input} 
            variant="filled" 
            placeholder="Email"
            type="email"
            error={emailError}
            helperText={emailError ? errorText : ""}
          />
          <TextField 
            onChange={(e) => handleUserUpdate(e, 'password')}
            onKeyDown={(e) => handleEnterLogin(e)}
            className={classes.input} 
            variant="filled" 
            placeholder="Password"
            type={togglePass ? "text" : "password"}
            error={passError}
            helperText={passError ? errorText : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setTogglePass(!togglePass)}>
                    { togglePass && <VisibilityOutlinedIcon /> }
                    { !togglePass && <VisibilityOffOutlinedIcon /> }
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <h4>Don't have an account? Click the Register button!</h4>
        </div>
        <div className={classes.btns}>
          <Button 
            width={100}
            height={50}
            borColor={'black'}
            borThic={2}
            borRad={5}
            bgColor={'#ef8d22'}
            color={'white'}
            fontSize={1.2}
            text={'Register'}
            onClick={handleRegisterClick}
          />
          <Button
            width={100}
            height={50}
            borColor={'black'}
            borThic={2}
            borRad={5}
            bgColor={'#7ab648'}
            color={'white'}
            fontSize={1.2}
            text={'Login'}
            onClick={handleLogin}
          />
        </div>
      </div>
      
    </div>
  )
}
