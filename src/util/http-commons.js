import axios from "axios";

const { VITE_VUE_API_URL, VITE_VUE_USER_API_URL, VITE_VUE_PLAN_API_URL } = import.meta.env;

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

// local user vue api axios instance
function userAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_USER_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

// local plan vue api axios instance
function planAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_PLAN_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}
export { localAxios, userAxios, planAxios };
