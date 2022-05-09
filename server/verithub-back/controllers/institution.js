const Sequelize = require('sequelize');
const institution = require('../models').institution;

module.exports = {

    find(params, res){
        let tipo = params.tipo
        let atributo = params.atributo
        institution.findAll({
            where: {
                [tipo]: atributo,
            }
        })
        .then(institutions => {
            let response = {
                data:institutions,
                exists: true,
            }

            if(institutions.length == 0){
                response.exists = false
            }
            res.status(200).send(response)
        })
        .catch(error => res.status(400).send(error));
    },

    create(params, res){
        institution.create({
            name: params.name,
            type: params.type,
            province: params.province,
            stars: params.stars,
            isPublic: params.isPublic,
        })
        .then(institutions => {
            res.status(200).send(institutions)
        })
        .catch(error => res.status(400).send(error));
    }
}