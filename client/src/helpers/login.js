const axios = require('axios');

const login = (userLoginInfo, history, updateUser, setErrorText, setEmailError, setPassError) => {

  axios.post('/api/login', userLoginInfo)
    .then(res => {

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("userId", res.data.user.id);

      const archivedProjects = res.data.projects.filter(project => project.archived === true);
      const nonArchivedProjectd = res.data.projects.filter(project => project.archived === false);

      const userInfo = {
        user: res.data.user,
        projects: nonArchivedProjectd,
        archivedProjects: archivedProjects,
        loggedIn: true,
      }

      updateUser(userInfo);
      history.push('/home');

    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 400) {
          setEmailError(true);
          setErrorText("Email Does Not Exist");
        } else if (error.response.status === 403)  {
          setPassError(true);
          setErrorText("Password Incorrect");
        };
      } else {
        console.log(error);
      }
    });

}

module.exports = { login }