import axios from "axios";

export default function checkAuth(setUserInfo, userInfo) {

  const id = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  const payload = {
    id,
    token,
  }

  axios.post('/api/check-auth', payload, { 'headers': { 'Authorization': 'Bearer ' + token }})
    .then(res => {

      const archivedProjects = res.data.projects.filter(project => project.archived === true);
      const nonArchivedProjectd = res.data.projects.filter(project => project.archived === false);

      setUserInfo({
        user: res.data.user,
        projects: nonArchivedProjectd,
        archivedProjects: archivedProjects,
        loggedIn: true,
      });

    })
    .catch(err => console.log(err));

}