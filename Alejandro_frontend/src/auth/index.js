import axios from "axios";
import Cookies from "js-cookie";



export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  register(email, password, password2) {
    let username = email
    console.log(password2)
    const user = { username, email, password, password2 };
    return axios.post("/api/register/", user);
  },
  login(email, password) {
    const user = { email, password };
    return axios.post("/api/login/", user);
  },
};
