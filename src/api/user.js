import { userAxios } from "@/util/http-commons"

const local = userAxios();

function signUp(article, success, fail){
    local.post('/register', JSON.stringify(article)).then(success).catch(fail);
}

export{
    signUp
}