import axios from "axios";
import { toast } from 'react-toastify';

export default function completeProject(projectId, userInfo, updateUser) {

  const payload = {
    projectId
  }

  axios.patch('/api/complete-project', payload)
    .then((res) => {
      const newProjectList = userInfo.projects.map(project => project.id === projectId ? { ...project, completed: true } : project);
      updateUser({
        ...userInfo,
        projects: newProjectList
      })
      return res;
    })
    .then((res) => {
      toast.success(`${res.data}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
    })
    .catch(err => console.log(err));

};