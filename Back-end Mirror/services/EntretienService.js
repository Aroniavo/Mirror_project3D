const Entretien = require("../models/Entretien")
const User = require("../models/User")

async function getAllEntretienService() {
    const e = await Entretien.findAll();
    return e ;
}


async function createEntretienService(data) {
    const e = await Entretien.create(data)
    return e
}