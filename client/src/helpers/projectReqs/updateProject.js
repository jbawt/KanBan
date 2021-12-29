import axios from "axios";
import { toast } from 'react-toastify';

export default function updateProject(editProjectDetails, userInfo, updateUser) {

  axios.patch('/api/update-project', editProjectDetails)
    .then((res) => {
      const selectedProject = userInfo.projects.filter(project => project.id === editProjectDetails.projectId)[0];
      selectedProject.title = editProjectDetails.title;
      selectedProject.due_date = editProjectDetails.dueDate;
      selectedProject.description = editProjectDetails.description;
      const newProjectList = userInfo.projects.map(project => {
        if (project.id === selectedProject.id) {
          return selectedProject;
        }
        return project;
      });

      updateUser({
        ...userInfo,
        projects: newProjectList,
      })
      
      toast.info(`${res.data}: ${editProjectDetails.title}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    })
    .catch(err => console.log(err));

};