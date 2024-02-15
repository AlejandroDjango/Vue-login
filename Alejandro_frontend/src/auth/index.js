import axios from "axios";
import Cookies from "js-cookie";

const ENDPOINT_PATH = "http://alejandrodjango.pythonanywhere.com/api/";

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  register(email, password, password2) {
    const user = { email, password, password2 };
    return axios.post(ENDPOINT_PATH+"register", user);
  },
  login(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH+"login", user);
  },
};
