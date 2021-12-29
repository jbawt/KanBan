import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import { useUserContext, useUpdateUserContext } from '../../context/userProvider';
import Button from '../uiComponents/Button';
import SearchIcon from '@mui/icons-material/Search';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import {
  InputAdornment,
  Autocomplete,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '8vh',
    backgroundColor: '#ef8d22',
    borderBottom: '2px solid #5e5e5e',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    height: '100%',
    width: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5em',
  },
  shadow: {
    textShadow: '5px 5px 8px #6e6e6e',
    transform: 'rotate(-10deg)',
  },
  btnGroup: {
    border: '2px solid red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '2%',
  },
  btn: {
    marginRight: 50
  },
  searchBar: {
    width: '25%',
    height: '53%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%',
    backgroundColor: 'white',
    borderRadius: '5px'
  },
  textField: {
    display: 'flex',
    width: '100%',
  },
  searchInput: {
    width: '100%'
  },
  logEditBtns: {
    display: 'flex',
  }
})

function NavBar() {

  const classes = useStyles();
  const userInfo = useUserContext();
  const updateUserInfo = useUpdateUserContext();
  const history = useHistory();
  const [value, setValue] = useState(null);
  const handleLogout = () => {
    updateUserInfo({
      user: [],
      projects: [],
      archivedProjects: [],
      loggedIn: false
    });
    sessionStorage.clear();
    history.push('/');
  }

  const handleProjectSearch = (e, value) => {
    sessionStorage.setItem("selectedProject", JSON.stringify(value))
    setValue(null);
    history.push('/project')
  }

  const handleEditPassword = () => {
    history.push('/change-password')
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h1 className={classes.shadow}><i>K</i>an</h1>
        <h1 className={classes.shadow}><i>B</i>an</h1>
      </div>
        {
          userInfo.loggedIn 
          &&
          <div className={classes.searchBar}> 
            <Autocomplete
              className={classes.searchInput}
              autoComplete
              autoHighlight
              value={value}
              options={userInfo.projects}
              getOptionLabel={(option) => option.title}
              noOptionsText="No Projects Found"
              onChange={(e, value) => {handleProjectSearch(e, value)}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Projects"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment:
                      <InputAdornment position="start">
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                  }}
                />
              )}
            />
          </div>
        }
      <div className={classes.btn}>
        {
          userInfo.loggedIn && 
          <div className={classes.logEditBtns}>
          <Tooltip title="Change Password">
            <IconButton onClick={handleEditPassword} >
              <ManageAccountsOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Button
            width={75}
            height={45}
            borColor={'white'}
            borThic={1}
            borRad={5}
            bgColor={'black'}
            color={'white'}
            fontSize={1.2}
            text={'Logout'}
            onClick={handleLogout}
          />
          </div>
        }
      </div>
    </div>
  )
}

export default NavBar