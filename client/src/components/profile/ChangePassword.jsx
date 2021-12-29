import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useUserContext, useUpdateUserContext } from '../../context/userProvider';
import { useHistory } from 'react-router-dom';
import changePass from '../../helpers/userReqs/changePass';
import EditUser from '../../modals/EditUser';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Stack,
  Tooltip,
  IconButton
} from '@mui/material';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '91.85vh',
    backgroundColor: '#5abaa7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    width: '40%',
    height: '40%',
    marginTop: '10%',
  },
  cardHeader: {
    textAlign: 'center',
    borderBottom: '2px solid #5e5e5e',
    backgroundColor: '#333333',
    color: 'white',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75%',
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'space-evenly',
  }
})

function ChangePassword() {

  const classes = useStyles();
  const userInfo = useUserContext();
  const updateUser = useUpdateUserContext();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [passCorrect, setPassCorrect] = useState(true);
  const [passMatch, setPassMatch] = useState(true);
  const [samePass, setSamePass] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [passwordInfo, setPasswordInfo] = useState({
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
  })

  const { user_name, email } = userInfo.user

  const handlePassInfo = (e) => {

    setPassMatch(true);
    setSamePass(false);
    setPassCorrect(true);

    if (e.target.id === 'current-pass') {
      setPasswordInfo({
        ...passwordInfo,
        currentPass: e.target.value,
      })
    } else if (e.target.id === 'new-pass') {
      setPasswordInfo({
        ...passwordInfo,
        newPass: e.target.value,
      })
    } else if (e.target.id === 'confirm-pass') {
      setPasswordInfo({
        ...passwordInfo,
        confirmNewPass: e.target.value,
      })
    }

  };

  const handleGoHome = () => {
    history.push('/home');
  }

  const handlePassChange = () => {

    if (passwordInfo.newPass !== passwordInfo.confirmNewPass) {

      setPassMatch(false);
      setHelperText("Passwords Don't Match");

      return;

    } else if (passwordInfo.currentPass === passwordInfo.newPass) {

      setSamePass(true);
      setHelperText("You cannot use the same password");

      return;

    } else {

      const passObj = {
        email: email,
        password: passwordInfo.currentPass,
        newPassword: passwordInfo.newPass
      }

      changePass(passObj, setPasswordInfo, setPassCorrect, setHelperText);

    };

  };

  const handleModalOpen = () => setModal(true);

  return (
    <div className={classes.root}>
      <h1>Change Password</h1>
      <Card className={classes.card}>
        <CardHeader
          title={user_name}
          className={classes.cardHeader}
          action={
            <Tooltip title="Edit Username">
              <IconButton onClick={handleModalOpen} color="inherit">
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <EditUser
          modal={modal}
          setModal={setModal}
          userInfo={userInfo}
          updateUser={updateUser}
        />
        <CardContent className={classes.cardContent}>
          <Stack spacing={5} width={600}>
            <TextField
              id="current-pass"
              label="Current Password"
              variant="filled"
              value={passwordInfo.currentPass}
              onChange={(e) => handlePassInfo(e)}
              error={samePass || !passCorrect}
              helperText={passCorrect ? "" : helperText}
            />
            <TextField
              id="new-pass"
              label="New Password"
              variant="filled"
              value={passwordInfo.newPass}
              onChange={(e) => handlePassInfo(e)}
              error={!passMatch || samePass}
              helperText={samePass ? helperText : ""}
            />
            <TextField
              id="confirm-pass"
              label="Confirm New Password"
              variant="filled"
              value={passwordInfo.confirmNewPass}
              onChange={(e) => handlePassInfo(e)}
              error={!passMatch}
              helperText={passMatch ? "" : helperText}
            />
            <div className={classes.btnGroup}>
              <Button onClick={handleGoHome} variant="contained" color="warning">
                Go Home
              </Button>
              <Button onClick={handlePassChange} variant="contained" color="warning">
                Change Password
              </Button>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChangePassword
