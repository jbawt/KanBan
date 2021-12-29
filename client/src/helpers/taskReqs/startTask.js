import axios from "axios";

export default function startTask(id, updateUser, userInfo, project_id) {

  const payload = {
    id
  };

  axios.patch('/api/start-task', payload)
    .then(res => {
      const project = userInfo.projects.filter(project => project.id === project_id)[0];
      const dataObj = {
        res,
        project
      };

      return dataObj
    })
    .then(dataObj => {
      const { res, project } = dataObj;
      const filteredTasks = project.tasks.filter(task => task.id !== id).concat(res.data[0]);
      project.tasks = filteredTasks;
      project.started = true;
      sessionStorage.setItem("selectedProject", JSON.stringify(project));
      return dataObj;
    })
    .then(dataObj => {
      const { project } = dataObj;
      const newProjectList = userInfo.projects.filter(project => project.id !== project_id).concat(project);
      return newProjectList;
    })
    .then(newProjectList => {
      updateUser({
        ...userInfo,
        projects: newProjectList
      })
    })
    .catch(err => console.log(err));

};