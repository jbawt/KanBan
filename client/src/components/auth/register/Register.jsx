import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useUpdateUserContext } from '../../../context/userProvider';
import { makeStyles } from '@material-ui/styles';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Button from '../../uiComponents/Button';
import register from '../../../helpers/register';
import validateEmail from '../../../helpers/validateEmail';
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
    height: '45vh',
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
    height: '65%',
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

export default function Register({ setRegister }) {

  const classes = useStyles();
  const updateUser = useUpdateUserContext();
  const history = useHistory();
  const [helperText, setHelperText] = useState("");
  const [matchingPass, setMatchingPass] = useState(true);
  const [emailExists, setEmailexists] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [togglePass, setTogglePass] = useState(false);
  const [toggleConfirmPass, setToggleConfirmPass] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegisterClick = () => setRegister(false);

  const handleRegisterInfo = (e) => {

    setEmailexists(false);
    setInvalidEmail(false);
    setUsernameExists(false);
    setMatchingPass(true);
    setHelperText("");

    if (e.target.id === 'email') {
      setRegisterInfo({
        ...registerInfo,
        email: e.target.value
      })
      setEmailexists(false);
    } else if (e.target.id === 'password') {
      setRegisterInfo({
        ...registerInfo,
        password: e.target.value
      })
    } else if (e.target.id === 'confirm-password') {
      setRegisterInfo({
        ...registerInfo,
        confirmPassword: e.target.value
      })
    } else if (e.target.id === 'user-name') {
      setRegisterInfo({
        ...registerInfo,
        userName: e.target.value
      })
    }
  }

  const handleRegister = () => {
    if (registerInfo.password === registerInfo.confirmPassword) {
      setMatchingPass(true);
      if (validateEmail(registerInfo.email)) {
        register(registerInfo, updateUser, history, setEmailexists, setUsernameExists, setHelperText);
      } else {
        setInvalidEmail(true);
        setHelperText("Invalid Email");
      }
    } else {
      setMatchingPass(false);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h1>Register</h1>
      </div>

      <div className={classes.form}>
        <div className={classes.inputs}>
          <TextField
            onChange={(e) => handleRegisterInfo(e)}
            id="user-name"
            error={usernameExists}
            helperText={usernameExists ? "Username Already Exists" : ""}
            className={classes.input}
            variant="filled"
            type="text"
            placeholder="Username"
          />
          <TextField
            onChange={(e) => handleRegisterInfo(e)}
            error={emailExists || invalidEmail}
            helperText={emailExists || invalidEmail ? helperText : ""}
            id="email"
            className={classes.input}
            variant="filled"
            type="email"
            placeholder="Email"
          />
          <TextField 
            onChange={(e) => handleRegisterInfo(e)}
            id="password"
            className={classes.input}
            variant="filled"
            type={togglePass ? "text" : "password"}
            error={!matchingPass}
            placeholder="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setTogglePass(!togglePass)}>
                    {!togglePass && <VisibilityOffOutlinedIcon />}
                    {togglePass && <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            onChange={(e) => handleRegisterInfo(e)}
            id="confirm-password" 
            className={classes.input}
            variant="filled"
            type={toggleConfirmPass ? "text" : "password"}
            error={!matchingPass}
            helperText={!matchingPass ? "Passwords Do Not Match" : ""}
            placeholder="Confirm Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setToggleConfirmPass(!toggleConfirmPass)}>
                    {!toggleConfirmPass && <VisibilityOffOutlinedIcon />}
                    {toggleConfirmPass && <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <h4>Have an account already? Click the Login button!</h4>
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
            onClick={handleRegister}
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
            onClick={handleRegisterClick}
          />
        </div>
      </div>
      
    </div>
  )
}

