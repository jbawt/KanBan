import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Modal, Box, Typography, TextField, TextareaAutosize } from '@mui/material';
import { useUserContext, useUpdateUserContext } from '../../context/userProvider';
import { useHistory } from 'react-router';
import NewTasks from './tasks/NewTasks';
import InProgressTasks from './tasks/InProgressTasks';
import CompletedTasks from './tasks/CompletedTasks';
import CustomButton from '../uiComponents/Button';
import { Button } from '@mui/material';
import createTask from '../../helpers/taskReqs/createTask';
import deleteProject from '../../helpers/projectReqs/deleteProject';
import completeProject from '../../helpers/projectReqs/completeProject';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '91.85vh',
    backgroundColor: '#5abaa7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: 0,
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tasksContainer: {
    width: '95%',
    maxHeight: '80vh',
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsDiv: {
    margin: '0 0 3% 0',
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '15%',
    position: 'relative',
    left: '40%',
  },
  taskModal: {
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
  taskModalInputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '80%',
    height: '60%',
    marginTop: '4%',
  },
  warningModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 400,
    backgroundColor: 'white',
    border: '2px solid red',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    color: 'red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '2%',
  },
  warningModalBtns: {
    width: '40%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  taskModalTitle: {
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskModalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '30%',
  }
})

function Project() {

  const classes = useStyles();
  const userInfo = useUserContext();
  const updateUser = useUpdateUserContext();
  const history = useHistory();
  const projectInfo = JSON.parse(sessionStorage.selectedProject);
  const [disableProjectFinish, setDisableProjectFinish] = useState(true);
  const [taskModal, setTaskModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [newTaskInfo, setNewTaskInfo] = useState({
    title: '',
    description: '',
    projectId: projectInfo.id,
  });
  const [newTaskTitleErr, setNewTaskTitleErr] = useState(false);

  const projectId = projectInfo.id;
  const { title, tasks } = projectInfo;

  const newTaskList = tasks.filter(task => task.started === false && task.completed === false)
  const inProgressTaskList = tasks.filter(task => task.started === true && task.completed === false)
  const completedTaskList = tasks.filter(task => task.started === true && task.completed === true)

  useEffect(() => {
    if (newTaskList.length !== 0 || inProgressTaskList.length !== 0) {
      setDisableProjectFinish(true);
    } else if (tasks.length === 0) {
      setDisableProjectFinish(true);
    } else {
      setDisableProjectFinish(false);
    }
  }, [newTaskList, inProgressTaskList, tasks])

  const handleBackClick = () => {
    history.push('/home');
    sessionStorage.removeItem("selectedProject");
  };

  const handleNewTaskInfo = (e) => {
    
    if (e.target.id === "title") {
      setNewTaskInfo({
        ...newTaskInfo,
        title: e.target.value
      });
    } else if (e.target.id === "description") {
      setNewTaskInfo({
        ...newTaskInfo,
        description: e.target.value,
      })
    }

  };

  const handleNewTaskSubmit = () => {
    if (newTaskInfo.title === '') {
      setNewTaskTitleErr(true);
    } else {
      createTask(newTaskInfo, updateUser, userInfo);
      setTaskModal(false);
      setNewTaskInfo({
        title: '',
        description: '',
        projectId: projectId,
      });
      setNewTaskTitleErr(false);
    }
  };

  const handleProjectDelete = () => {
    deleteProject(projectId, userInfo, updateUser);
    history.push('/home')
    sessionStorage.removeItem("selectedProject");
  };

  const handleProjectFinish = () => {
    completeProject(projectId, userInfo, updateUser)
    history.push('/home');
    sessionStorage.removeItem("selectedProject");
  };

  const handleTaskModalOpen = () => setTaskModal(true);
  const handleTaskModalClose = () => { 
    setTaskModal(false);
    setNewTaskInfo({
      title: '',
      description: '',
      projectId: projectId,
    });
    setNewTaskTitleErr(false);
  };
  const handleWarningModalOpen = () => setWarningModal(true);
  const handleWarningModalClose = () => setWarningModal(false);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustomButton 
          width={140}
          height={50}
          borColor={'#5e5e5e'}
          borThic={1}
          borRad={5}
          bgColor={'black'}
          color={'white'}
          fontSize={1.2}
          text={'Back'}
          onClick={handleBackClick}
        />
        <h1>{title}</h1>
        <CustomButton 
          width={140}
          height={50}
          borColor={'#5e5e5e'}
          borThic={1}
          borRad={5}
          bgColor={'#7ab648'}
          color={'white'}
          fontSize={1.2}
          text={'Add Task'}
          onClick={handleTaskModalOpen}
        />
        <Modal
          open={taskModal}
          onClose={handleTaskModalClose}
          aria-labelledby="new-task-modal"
        >
          <Box className={classes.taskModal}>
            <Typography id="new-task-modal" className={classes.taskModalTitle} variant="h6" component="h2">
              Create a new task
            </Typography>
            <div className={classes.taskModalInputs}>
              <TextField
                id="title"
                error={newTaskTitleErr}
                helperText={newTaskTitleErr ? "Please enter a title" : ""}
                variant="outlined"
                label="Title"
                onChange={handleNewTaskInfo}
              />
              <TextareaAutosize
                id="description"
                placeholder="Description"
                minRows={8}
                onChange={handleNewTaskInfo}
              />
            </div>
            <div className={classes.taskModalButtons}>
              <Button onClick={handleTaskModalClose} variant="outlined" color="error">Cancel</Button>
              <Button onClick={handleNewTaskSubmit} variant="outlined" color="success">Add Task</Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div className={classes.tasksContainer}>
        <NewTasks taskList={newTaskList} taskPhase={"new"} />
        <InProgressTasks taskList={inProgressTaskList} taskPhase={"inProg"} />
        <CompletedTasks taskList={completedTaskList} taskPhase={"complete"} />
      </div>
      <div className={classes.buttonsDiv}>
        <CustomButton 
          width={140}
          height={50}
          borColor={'#5e5e5e'}
          borThic={1}
          borRad={5}
          bgColor={'#7ab648'}
          color={'white'}
          fontSize={1.2}
          text={'Finish Project'}
          disabled={disableProjectFinish}
          onClick={handleProjectFinish}
        />
        <CustomButton 
          width={140}
          height={50}
          borColor={'#5e5e5e'}
          borThic={2}
          borRad={5}
          bgColor={'#ff3838'}
          color={'white'}
          fontSize={1.2}
          text={'Delete Project'}
          onClick={handleWarningModalOpen}
        />
        <Modal
          open={warningModal}
          onClose={handleWarningModalClose}
          aria-labelledby="confirm-delete"
          aria-describedby="confirm-delete-text"
        >
          <Box className={classes.warningModal}>
            <Typography id="confirm-delete" variant="h4" component="h2">
              Are you sure you want to delete: {title}?
            </Typography>
            <Typography id="confirm-delete-text" variant="h5" sx={{ mt: 2 }}>
              This is a destructive action. Once confirmed you will not be able to retrieve the project that is being deleted. Proceed with caution.
            </Typography>
            <div className={classes.warningModalBtns}>
              <Button onClick={handleWarningModalClose} variant="outlined" color="success">Cancel</Button>
              <Button onClick={handleProjectDelete} variant="outlined" color="error">Confirm</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default Project