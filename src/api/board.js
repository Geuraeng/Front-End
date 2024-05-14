import { localAxios } from "@/util/http-commons";

const local = localAxios();

function detailArticle(articleno, success, fail) {
  local.get(`/read/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  local.post(`update`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(article, success, fail) {
  local.delete(`/delete/${article}`).then(success).catch(fail);
}

function registArticle(article, success, fail) {
  local.post("write", JSON.stringify(article)).then(success).catch(fail);
}

export { detailArticle, registArticle, modifyArticle, deleteArticle };
