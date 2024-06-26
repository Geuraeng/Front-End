import { commentAxios } from "@/util/http-commons";

const local = commentAxios();

function getCommentList(boardId, success, fail) {
  local.get(`/list/${boardId}`).then(success).catch(fail);
}

function postCommentInfo(boardId, info, success, fail) {
  local.post(`/write/${boardId}`, info).then(success).catch(fail);
}

function deleteCommentInfo(idx, success, fail) {
  local.get(`/delete/${idx}`).then(success).catch(fail);
}

function updateCommentInfo(idx, info, success, fail) {
  local.post(`/update/${idx}`, info).then(success).catch(fail);
}

export { getCommentList, postCommentInfo, deleteCommentInfo, updateCommentInfo };
