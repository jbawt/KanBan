import axios from "axios";
import { toast } from "react-toastify";

export default function archiveProject(projectId, userInfo, updateUser) {

  axios.patch('/api/archive-project', { projectId })
    .then(res => {
      
      const selectedProject = userInfo.projects.filter(project => project.id === projectId);
      selectedProject.archived = true;
      const newProjectList = userInfo.projects.filter(project => project.id !== projectId);
      const newArchivedProjectList = userInfo.archivedProjects.concat(selectedProject);

      updateUser({
        ...userInfo,
        projects: newProjectList,
        archivedProjects: newArchivedProjectList
      });

      toast.success(`${res.data}`, {
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