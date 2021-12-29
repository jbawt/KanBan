import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useUserContext, useUpdateUserContext } from '../../context/userProvider';
import { ToastContainer } from 'react-toastify';
import createProject from '../../helpers/projectReqs/createProject';
import ProjectTiles from './tile/ProjectTiles';
import CustomButton from '../uiComponents/Button';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { 
  Tooltip,
  Modal,
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  Stack,
  Button,
} from '@mui/material';


const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '91.85vh',
    backgroundColor: '#5abaa7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    width: '90%',
    fontSize: '1.1em',
    textAlign: 'center',
    borderBottom: '2px solid #5e5e5e',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 2,
    marginLeft: '2%',
  },
  projectModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 500,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1% 0 0 1%',
  },
  projectModalInputs: {
    width: '80%',
    marginTop: '3%',
    display: 'flex',
    justifyContent: 'center',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    position: 'relative',
    left: '25%',
  },
  noProjectDisplay: {
    border: '2px solid #5e5e5e',
    borderRadius: '10px',
    backgroundColor: '#333333',
    color: 'white',
    width: '30%',
    height: '50%',
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})

function Home() {

  const classes = useStyles();
  const userInfo = useUserContext();
  const updateUser = useUpdateUserContext();
  const [showArchives, setShowArchives] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const [inputErrors, setInputErrors] = useState(false);
  const [newProjectDetails, setNewProjectDetails] = useState({
    title: '',
    description: '',
    dueDate: new Date(Date.now()),
    userId: userInfo.user.id
  });

  const handleModalOpen = () => setProjectModal(true);
  const handleModalClose = () => setProjectModal(false);

  const handleProjectDetails = (e) => {

    if (e.target.id === 'title') {
      setNewProjectDetails({
        ...newProjectDetails,
        title: e.target.value
      });
    } else if (e.target.id === 'description') {
      setNewProjectDetails({
        ...newProjectDetails,
        description: e.target.value
      })
    }

  }

  const handleProjectDate = (newValue) => {
    setNewProjectDetails({
      ...newProjectDetails,
      dueDate: newValue
    })
  };

  const handleProjectSubmit = () => {

    if (newProjectDetails.title === '' || newProjectDetails.description === '') {
      setInputErrors(true);
      return
    } else {
      setInputErrors(false);
    }

    createProject(newProjectDetails, userInfo, updateUser);
    setProjectModal(false);

  }

  const handleShowArchives = () => {
    setShowArchives(!showArchives);
  }


  return (
    <div className={classes.root}>
      <ToastContainer />
      <div className={classes.header}>
        <div>
            <CustomButton 
              width={100}
              height={50}
              borColor={'#5e5e5e'}
              borThic={1}
              borRad={5}
              bgColor={'#7ab648'}
              color={'white'}
              fontSize={1}
              text={showArchives ? "Home" : "Open Archives"}
              onClick={handleShowArchives}
            />
          </div>
        <h1 className={classes.title}>{showArchives ? "Archived Projects" : "Projects"}</h1>
        <Tooltip title="Create New Project" arrow leaveDelay={500}>
          <div>
            {!showArchives ? 
              <CustomButton 
                width={100}
                height={50}
                borColor={'#5e5e5e'}
                borThic={1}
                borRad={5}
                bgColor={'#7ab648'}
                color={'white'}
                fontSize={2.5}
                text={'+'}
                onClick={handleModalOpen}
              />
              :
              <div></div>
            }
          </div>
        </Tooltip>
        <Modal
          open={projectModal}
          onClose={handleModalClose}
          aria-labelledby="new-project"
        >
          <Box className={classes.projectModal}>
            <Typography id="new-project" variant="h5" component="h1">
              Create a new Project
            </Typography>
            <div className={classes.projectModalInputs}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={4}>
                <TextField 
                  id="title"
                  label="Title"
                  error={inputErrors}
                  helperText={inputErrors ? "Please enter all fields" : ""}
                  onChange={handleProjectDetails}
                />
                <DesktopDatePicker
                  id="date"
                  label="Due Date"
                  inputFormat="MM/dd/yyyy"
                  value={newProjectDetails.dueDate}
                  onChange={handleProjectDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TextareaAutosize
                  id="description"
                  placeholder="Description"
                  minRows={8}
                  maxLength={255}
                  style={{ width: 631 }}
                  onChange={handleProjectDetails}
                />
                <div className={classes.modalButtons}>
                  <Button onClick={handleModalClose} variant="outlined" color="error" >Cancel</Button>
                  <Button onClick={handleProjectSubmit} variant="outlined" color="success" >Add Project</Button>
                </div>
              </Stack>
            </LocalizationProvider>
            </div>
          </Box>
        </Modal>
      </div>
      { 
        userInfo.projects.length === 0
        && 
        <div className={classes.noProjectDisplay}>
          <h1>Looks Like you don't have any Projects 😕</h1>
          <Button onClick={handleModalOpen} variant="contained" color="success" >
            Create One Now!
          </Button>
        </div> 
      }
      <ProjectTiles showArchives={showArchives} />
    </div>
  )
}

export default Home
