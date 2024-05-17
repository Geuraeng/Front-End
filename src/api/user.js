import { userAxios } from "@/util/http-commons";

const local = userAxios();

async function signUp(article, success, fail) {
  local.post("/register", JSON.stringify(article)).then(success).catch(fail);
}

async function userConfirm(param, success, fail) {
  await local.post(`/login`, param).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/refresh`, user).then(success).catch(fail);
}

async function logout(userId, success, fail) {
  await local.get(`/logout/${userId}`).then(success).catch(fail);
}

async function getMyPage(success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/mypage`).then(success).catch(fail);
}

export { signUp, userConfirm, findById, tokenRegeneration, logout, getMyPage };
