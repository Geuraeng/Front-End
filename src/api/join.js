import { joinAxios } from "@/util/http-commons";

const join = joinAxios();

function listJoin(success, fail) {
  join.get(`/list`).then(success).catch(fail);
}

function detailJoin(joinIdx, success, fail) {
  join.get(`/read/${joinIdx}`).then(success).catch(fail);
}

function deleteJoin(joinIdx, success, fail) {
  join.delete(`/delete/${joinIdx}`).then(success).catch(fail);
}

function registJoin(joinIdx, success, fail) {
  join.post("/write", JSON.stringify(joinIdx)).then(success).catch(fail);
}

export { listJoin, detailJoin, registJoin, deleteJoin };
