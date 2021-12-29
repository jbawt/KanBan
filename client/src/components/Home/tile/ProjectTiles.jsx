import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useUserContext, useUpdateUserContext } from '../../../context/userProvider';
import ProjectTile from './ProjectTile';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '85vh',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'scroll',
    "&::-webkit-scrollbar": {
      display: 'none',
    },
    "-ms-overflow-style": 'none',
    scrollbarWidth: 'none',
  }
})

function ProjectTiles({ showArchives }) {

  const classes = useStyles();
  const userInfo = useUserContext();
  const updateUser = useUpdateUserContext();
  let projectTileList;

  if (showArchives) {
    projectTileList = userInfo.archivedProjects.map((project, key) => {
      return (
        <ProjectTile
          key={key} 
          project={project}
          updateUser={updateUser}
          userInfo={userInfo}
        />
      )
    });
  } else {
    projectTileList = userInfo.projects.map((project, key) => {
      return (
        <ProjectTile
          key={key} 
          project={project}
          updateUser={updateUser}
          userInfo={userInfo}
        />
      )
    });
  }

  return (
    <div className={classes.root}>
      { projectTileList }
    </div>
  )
}

export default ProjectTiles
