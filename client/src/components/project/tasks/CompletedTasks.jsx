import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Task from './task/Task';

const useStyles = makeStyles({
  root: {
    width: '30%',
    maxHeight: '100%',
    borderBottom: 'none',
    borderTop: 'none',
  },
  header: {
    width: '100%',
    border: '2px solid #5e5e5e',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ef8d22',
  },
  tasksContainer: {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: '2px solid #5e5e5e',
    overflow: 'scroll',
    "&::-webkit-scrollbar": {
      display: 'none',
    },
    "-ms-overflow-style": 'none',
    scrollbarWidth: 'none',
  }
})

function CompletedTasks({ taskList, taskPhase }) {

  const classes = useStyles();

  const tasks = taskList.map((task, key) => {
    return (
      <Task
        key={key}
        task={task}
        taskBtnText={'Fix'}
        taskBtnColor={'#ff3838'}
        taskPhase={taskPhase}
      />
    )
  })

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>Completed</h1>
      </div>
      <div className={classes.tasksContainer}>
        {tasks}
      </div>
    </div>
  )
}

export default CompletedTasks
