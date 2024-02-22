import axios from "axios";
import Cookies from "js-cookie";



export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  register(email, username, password, password2) {
    const user = { username, email, password, password2 };
    return axios.post("/api/register/", user);
  },
  login(username, password) {
    const user = { username, password };
    return axios.post("/api/token/", user);
  },
};
