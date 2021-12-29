import axios from "axios";
import { toast } from 'react-toastify';

export default function createProject( projectObj, userInfo, updateUser ) {

  axios.post('/api/create-project', projectObj)
    .then(res => {
      res.data[0].tasks = [];
      updateUser({
        ...userInfo,
        projects: userInfo.projects.concat(res.data[0])
      });

      toast.success(`Project: ${res.data[0].title} Created Successfully`, {
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