import axios from "axios";
import { toast } from "react-toastify";

export default function updateUserInfo(newUserInfo, userInfo, updateUser) {

  axios.patch('/api/update-user', newUserInfo)
    .then(res => {
      updateUser({
        ...userInfo,
        user: res.data 
      });
    })
    .then(() => {
      toast.success("Changes Saved", {
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