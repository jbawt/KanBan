import axios from "axios";
import { toast } from 'react-toastify';

export default function deleteProject(projectId, userInfo, updateUser) {

  const payload = {
    data: {
      projectId
    }
  }

  axios.delete('/api/delete-project', payload)
    .then(res => {
      const newProjectList = userInfo.projects.filter(project => project.id !== projectId);
      const newArchiveProjectList = userInfo.archivedProjects.filter(project => project.id !== projectId);
      updateUser({
        ...userInfo,
        projects: newProjectList,
        archivedProjects: newArchiveProjectList
      })

      toast.error(`${res.data}`, {
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