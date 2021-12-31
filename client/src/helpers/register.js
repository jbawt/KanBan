import axios from "axios";

export default function register(registerInfo, updateUser, history, setEmailExists, setUsernameExists, setHelperText) {

  axios.post('/api/register', registerInfo)
    .then(res => {

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("userId", res.data.user.id);

      updateUser({
        user: res.data.user,
        projects: [],
        archivedProjects: [],
        loggedIn: true,
      });

      history.push('/home');
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 400) {
          setEmailExists(true);
          setHelperText("Email Already Exists");
        } else if (error.response.status === 403) {
          setUsernameExists(true);
        }
      } else {
        console.log(error);
      }
    });

}