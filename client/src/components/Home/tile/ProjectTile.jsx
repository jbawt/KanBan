import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import { format } from 'date-fns';
import deleteProject from '../../../helpers/projectReqs/deleteProject';
import updateProject from '../../../helpers/projectReqs/updateProject';
import archiveProject from '../../../helpers/projectReqs/archiveProject';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Modal,
  Box,
  Tooltip,
  Button,
  TextField,
  TextareaAutosize,
  Stack,
} from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

const useStyles = makeStyles({
  root: {
    width: '20%',
    height: '40%',
    margin: '2.5% 2.5% 0 2.5%',
  },
  cardHeader: {
    backgroundColor: '#333333',
    color: 'white',
  },
  cardSubHeader: {
    color: 'lightgrey',
  },
  cardContent: {
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '2px solid #5e5e5e',
  },
  started: {
    border: '2px solid #5e5e5e',
    borderRadius: '10px',
    width: '80%',
    height: '3vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2em',
    margin: '0 2% 0 5%',
    backgroundColor: '#e9f016',
  },
  notStarted: {
    border: '2px solid #5e5e5e',
    borderRadius: '10px',
    width: '80%',
    height: '3vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2em',
    margin: '0 2% 0 5%',
    backgroundColor: '#ff715f',
  },
  complete: {
    border: '2px solid #5e5e5e',
    borderRadius: '10px',
    width: '80%',
    height: '3vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2em',
    margin: '0 2% 0 5%',
    backgroundColor: '#a3d977',
  },
  buttons: {
    border: '2px solid white',
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
  editModal: {
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
  editModalInputs: {
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
})

function ProjectTile({ project, updateUser, userInfo }) {
  
  const classes = useStyles();
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [changeMade, setChangeMade] = useState(false);
  const { title, description, due_date, started, completed, id, archived } = project;
  const [editProjectDetails, setEditProjectDetails] = useState({
    title: title,
    description: description,
    dueDate: due_date,
    projectId: id
  });

  // Change date to 'Friday Dec 10 2021' format
  const date = due_date.split("T")[0].split("-");
  const year = date[0];
  const month = date[1] - 1;
  const day = date[2] - 1;
  const formattedDate = format(new Date(year, month, day), 'MMM do yyyy');

  const handleProjectClick = () => {

    const selectedProject = project

    sessionStorage.setItem("selectedProject", JSON.stringify(selectedProject));
    updateUser({
      ...userInfo,
      selectedProject: id
    });
    history.push('/project');
  }

  const handleProjectDelete = () => {
    const projectId = id
    deleteProject(projectId, userInfo, updateUser);
    setModalOpen(false);
  }

  const handleProjectDetails = (e) => {

    if (e.target.id === 'title') {
      setEditProjectDetails({
        ...editProjectDetails,
        title: e.target.value
      });
    } else if (e.target.id === 'description') {
      setEditProjectDetails({
        ...editProjectDetails,
        description: e.target.value
      })
    }

    setChangeMade(true);

  }

  const handleProjectDate = (newValue) => {

    const ISODueDate = new Date(newValue).toISOString();

    setEditProjectDetails({
      ...editProjectDetails,
      dueDate: ISODueDate
    });

    setChangeMade(true);

  };

  const handleProjectArchive = () => {

    const projectId = id;
    archiveProject(projectId, userInfo, updateUser);

  };

  const handleSaveChanges = () => {
    setEditModalOpen(false);
    setChangeMade(false);
    updateProject(editProjectDetails, userInfo, updateUser);
  }

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditProjectDetails({
      title: title,
      description: description,
      dueDate: due_date,
      projectId: id
    });
    setChangeMade(false);
  }

  return (
    <Card className={classes.root}>
      <CardHeader 
        title={title}
        subheader={
          <Typography className={classes.cardSubHeader}>
            Finish By {formattedDate}
          </Typography>
        }
        action={
          <>
            {
              archived ?
              <div></div>
              :
              <Tooltip title="Archive Project">
                <IconButton onClick={handleProjectArchive} color="inherit">
                  <ArchiveOutlinedIcon />
                </IconButton>
              </Tooltip>
            }
            <Tooltip title="Go To Project">
              <IconButton onClick={handleProjectClick} color="inherit">
                <KeyboardTabIcon />
              </IconButton>
            </Tooltip>
          </>
        }
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        {description}
      </CardContent>
      <CardActions disableSpacing>
        { (!started && !completed) && <div className={classes.notStarted}>Not Started</div>  }
        { (started && !completed) && <div className={classes.started}>In Progress</div> }
        { (started && completed) && <div className={classes.complete}>Completed</div> }
        <Tooltip title="Edit Project">
          <IconButton onClick={handleEditModalOpen} color="warning">
            <EditOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Modal
          open={editModalOpen}
          onClose={handleEditModalClose}
          aria-labelledby="edit"
        >
          <Box className={classes.editModal}>
            <Typography id="edit" variant="h5" component="h1">
              Edit: {title}
            </Typography>
            <div className={classes.editModalInputs}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={4}>
                <TextField 
                  id="title"
                  label="Title"
                  value={editProjectDetails.title}
                  onChange={handleProjectDetails}
                />
                <DesktopDatePicker
                  id="date"
                  label="Due Date"
                  inputFormat="MM/dd/yyyy"
                  value={editProjectDetails.dueDate}
                  onChange={handleProjectDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TextareaAutosize
                  id="description"
                  placeholder="Description"
                  minRows={8}
                  maxLength={255}
                  value={editProjectDetails.description}
                  style={{ width: 631 }}
                  onChange={handleProjectDetails}
                />
                <div className={classes.modalButtons}>
                  <Button onClick={handleEditModalClose} variant="outlined" color="error" >Cancel</Button>
                  <Button onClick={handleSaveChanges} disabled={!changeMade} variant="outlined" color="success" >Save Changes</Button>
                </div>
              </Stack>
            </LocalizationProvider>
            </div>
          </Box>
        </Modal>
        <Tooltip title="Delete Project">
          <IconButton onClick={handleModalOpen} color="error">
            <DeleteForeverOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="delete"
          aria-describedby="delete-text"
        >
          <Box className={classes.warningModal}>
            <Typography id="delete" variant="h4" component="h2">
              Are you sure you want to delete: {title}?
            </Typography>
            <Typography id="delete-text" variant="h6" sx={{ mt: 2 }}>
              This is a destructive action. Once confirmed you will not be able to retrieve the project that is being deleted. Proceed with caution.
            </Typography>
            <div className={classes.warningModalBtns}>
              <Button onClick={handleModalClose} variant="outlined" color="success">Cancel</Button>
              <Button onClick={handleProjectDelete} variant="outlined" color="error">Confirm</Button>
            </div>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  )
}

export default ProjectTile
