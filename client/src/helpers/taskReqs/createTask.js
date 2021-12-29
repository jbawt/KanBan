import axios from 'axios';

export default function createTask(newTaskInfo, updateUser, userInfo) {

  axios.post('/api/create-task', newTaskInfo)
    .then((res) => {
      const selectedProject = JSON.parse(sessionStorage.selectedProject);
      const currentProject = userInfo.projects.filter(project => project.id === selectedProject.id)[0];
      currentProject.tasks = currentProject.tasks.concat(res.data[0]);
      sessionStorage.setItem("selectedProject", JSON.stringify(currentProject));
      const newProjectList = userInfo.projects.filter(project => project.id !== selectedProject.id).concat(currentProject).reverse();
      updateUser({
        ...userInfo,
        projects: newProjectList
      });
    })
    .catch(err => console.log(err)); 

};