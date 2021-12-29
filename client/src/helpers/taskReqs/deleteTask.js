import axios from 'axios';
import { toast } from 'react-toastify';

export default function deleteTask(taskId, userInfo, updateUser) {

  const payload = {
    data: {
      taskId
    }
  }

  axios.delete('/api/delete-task', payload)
    .then((res) => {

      const selectedProject = JSON.parse(sessionStorage.selectedProject);

      const newProjectList = userInfo.projects.map(project => {
        if (project.id === selectedProject.id) {
          project.tasks = project.tasks.filter(task => task.id !== taskId);
          sessionStorage.setItem("selectedProject", JSON.stringify(project));
        };
        return project;
      });
      updateUser({
        ...userInfo,
        projects: newProjectList
      });

      return res;
    })
    .then(res => {
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