const Conference = require("../models/Conference")
const User = require("../models/User")


async function getAllConference() {
    const confs = await Conference.findAll();
    return confs ;
}

async function getConferenceByCompany(name_company) {
    const conf_company = await Conference.findAll({name_company : name_company})
    if(conf_company){
        return conf_company
    }
    return null
}

async function getConferenceByUser(id_user) {
    
}

async function createConference(data) {
    const conference = await Conference.create(data)
    return conference
}

module.exports = {getAllConference,getConferenceByCompany,getConferenceByUser,createConference}