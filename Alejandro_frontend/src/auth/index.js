import axios from "axios";
import Cookies from "js-cookie";

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  register(user, email, password, password2) {
    const user = { user, email, password, password2 };
    return axios.post("register", user);
  },
  login(email, password) {
    const user = { email, password };
    return axios.post("login", user);
  },
};
