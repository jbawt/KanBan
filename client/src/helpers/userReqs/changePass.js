import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function changePass(passObj, setPasswordInfo, setPassCorrect, setHelperText) {

  axios.patch('/api/change-pass', passObj)
    .then(res => {
      toast.success(<div><p>{res.data}</p><Link to="/home">Go Home</Link></div>, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    })
    .then(() => {
      setPasswordInfo({
        currentPass: "",
        newPass: "",
        confirmNewPass: ""
      })
    })
    .catch(error => {

      if (error.response) {
        if (error.response.status === 400) {
          setPassCorrect(false);
          setHelperText("Incorrect Password");
        }
      } else {
        console.log(error);
      }

    })

};