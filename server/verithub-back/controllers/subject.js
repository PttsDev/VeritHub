const Sequelize = require('sequelize');
const subject = require('../models').subject;

module.exports = {
    
    findAll(params, res){
        let courseID = params.courseID
        subject.findAll({
            where: {
                courseID: courseID,
            }
        })
        .then(subjects => {
            let response = {
                subjects:subjects,
                exists: true,
            }

            if(subjects.length == 0){
                response.exists = false
            }
            res.status(200).send(response)
        })
        .catch(error => res.status(400).send({error: "imposible de encontrar"}));
    },

    create(params, res){
        subject.create({
            name: params.name,
            credits: params.credits,
            year: params.year,
            stars: params.stars,
            courseID: params.courseID,
        })
        .then(subjects => {
            res.status(200).send(subjects)
        })
        .catch(error => res.status(400).send(error));
    },

    findById(params, res){
        id = params.subjectID;
        subject.findOne({
            where: {
                id: id,
            }
        })
        .then(subject => {
            res.status(200).send(subject)
        })
        .catch(error => res.status(400).send(error));
    }
}