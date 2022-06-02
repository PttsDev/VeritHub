const Sequelize = require('sequelize');
const course = require('../models').course;

module.exports = {

    findAll(params, res){
        let id = params.id
        institution.findAll({
            where: {
                [id]: id,
            }
        })
        .then(courses => {
            let response = {
                courses:courses,
                exists: true,
            }

            if(courses.length == 0){
                response.exists = false
            }
            res.status(200).send(response)
        })
        .catch(error => res.status(400).send({error: "imposible de encontrar"}));
    },

    create(params, res){
        course.create({
            name: params.name,
            price: params.price,
            minGrade: params.minGrade,
            stars: params.stars,
            numStudents: params.numStudents,
        })
        .then(courses => {
            res.status(200).send(courses)
        })
        .catch(error => res.status(400).send(error));
    }
}