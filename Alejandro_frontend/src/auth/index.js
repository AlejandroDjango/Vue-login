import axios from "axios";
import { api } from "axios";
import Cookies from "js-cookie";

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  setToken(token) {
    Cookies.set("token", token);
  },
  getToken() {
    return Cookies.get("token");
  },
  setRefresh(token) {
    Cookies.set("token-refresh", token);
  },
  getRefresh() {
    return Cookies.get("token-refresh");
  },
  setAll(user, token, refresh) {
    setUserLogged(user);
    setToken(token);
  },
  getAll() {
    return Cookies.get("userLogged", "token", "token-refresh");
  },
  register(email, username, password, password2) {
    const user = { username, email, password, password2 };
    return axios.post("/api/register/", user);
  },
  login(username, password) {
    const user = { username, password };
    return axios.post("/api/token/", user);
  },
  getUser(username){
    return axios.api.get("/api/users/?search=${username}");
  }
};
