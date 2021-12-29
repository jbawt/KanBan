import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import updateUserInfo from '../helpers/userReqs/updateUserInfo';
import {
  Box,
  Modal,
  Button,
  Stack,
  TextField
} from '@mui/material';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalBtns: {
    display: 'flex',
    justifyContent: 'space-around',
  }
})

function EditUser({ userInfo, modal, setModal, updateUser }) {

  const classes = useStyles();
  const [newUserInfo, setUserInfo] = useState({
    userId: userInfo.user.id,
    newEmail: userInfo.user.email,
    newUserName: userInfo.user.user_name,
  });

  const handleNewUserInfo = (e) => {

    if (e.target.id === "email") {
      setUserInfo({
        ...newUserInfo,
        newEmail: e.target.value
      });
    } else if (e.target.id === "user-name") {
      setUserInfo({
        ...newUserInfo,
        newUserName: e.target.value
      })
    }
  };

  const handleModalClose = () => {
    setModal(false);
    setUserInfo({
      userId: userInfo.user.id,
      newEmail: userInfo.user.email,
      newUserName: userInfo.user.user_name
    })
  };

  const handleUserUpdate = () => {
    updateUserInfo(newUserInfo, userInfo, updateUser);
    setModal(false);
  }

  return (
    <Modal
      open={modal}
      onClose={handleModalClose}
      aria-labelledby="edit-user-modal"
    >
      <Box className={classes.root}>
        <h1>Edit Info</h1>
        <Stack spacing={5} width={500}>
          <TextField
            id="user-name"
            label="Username"
            value={newUserInfo.newUserName}
            onChange={(e) => handleNewUserInfo(e)}
          />
          <TextField
            id="email"
            label="Email"
            value={newUserInfo.newEmail}
            onChange={(e) => handleNewUserInfo(e)}
          />
          <div className={classes.modalBtns}>
            <Button onClick={handleModalClose} variant="outlined" color="error">Cancel</Button>
            <Button onClick={handleUserUpdate} variant="outlined" color="success">Save Changes</Button>
          </div>
        </Stack>
      </Box>
    </Modal>
  )
}

export default EditUser
