import { planAxios } from "@/util/http-commons";

const plan = planAxios();

function listPlan(success, fail) {
  plan.get(`/list`).then(success).catch(fail);
}

function detailPlan(planIdx, success, fail) {
  plan.get(`/read/${planIdx}`).then(success).catch(fail);
}

function modifyPlan(planIdx, success, fail) {
  plan.post(`update`, JSON.stringify(planIdx)).then(success).catch(fail);
}

function deletePlan(planIdx, success, fail) {
  plan.delete(`/delete/${planIdx}`).then(success).catch(fail);
}

function registPlan(planIdx, success, fail) {
  plan.post("write", JSON.stringify(planIdx)).then(success).catch(fail);
}

export { listPlan, detailPlan, registPlan, modifyPlan, deletePlan };
