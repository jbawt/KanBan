import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useUpdateUserContext, useUserContext } from '../../../../context/userProvider';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { IconButton, Tooltip } from '@mui/material';
import Button from '../../../uiComponents/Button';
import startTask from '../../../../helpers/taskReqs/startTask';
import completeTask from '../../../../helpers/taskReqs/completeTask';
import fixTask from '../../../../helpers/taskReqs/fixTask';
import deleteTask from '../../../../helpers/taskReqs/deleteTask';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    minHeight: '15%',
    border: '2px solid #5e5e5e',
    borderRadius: '10px',
    marginTop: '2%',
    padding: '0 2% 0 2%',
    backgroundColor: 'white',
  },
  leftDot: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  actionArea: {
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: '0 0 3% 0',
  }
})

function Task({ task, taskBtnText, taskBtnColor, taskPhase }) {

  const classes = useStyles();
  const { title, description, id, project_id } = task;
  const userInfo = useUserContext();
  const updateUser = useUpdateUserContext();
  
  const handleTaskStart = () => {
    if (taskPhase === "new") {
      startTask(id, updateUser, userInfo, project_id);
    } else if (taskPhase === "inProg") {
      completeTask(id, updateUser, userInfo, project_id);
    } else if (taskPhase === "complete") {
      fixTask(id, updateUser, userInfo, project_id);
    }
  }

  const handleTaskDelete = () => {
    deleteTask(id, userInfo, updateUser);
  }

  return (
    <div className={classes.root}>
      <div className={classes.leftDot}>
        <RadioButtonCheckedIcon fontSize="large" />
      </div>
      <div className={classes.content}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className={classes.actionArea}>
        <Button 
          width={70}
          height={35}
          borColor={'#5e5e5e'}
          borThic={1}
          borRad={5}
          bgColor={taskBtnColor}
          color={'white'}
          fontSize={1.2}
          text={taskBtnText}
          onClick={handleTaskStart}
        />
        <Tooltip title="Delete Task">
          <IconButton onClick={handleTaskDelete} color="error">
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}

export default Task
