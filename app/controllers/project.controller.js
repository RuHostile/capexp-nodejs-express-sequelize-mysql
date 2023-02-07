const db = require("../models");
const Project = db.projects;

const Op = db.Sequelize.Op;

// Create and Save a new Project
exports.create = (req, res) => {
  //validate request 
  if (!req.body.projectName) {
    res.status(400).send({
      message: "Content projectName cannot be empty!"
    });
    return;
  }
  //Create a Project 
  const project = {
    projectName: req.body.projectName,
    description: req.body.description,
    department: req.body.department,
    capexp: req.body.capexp
  };
  //Save Project in the database 
  Project.create(project)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Project."
    });
  });
};


//Retrieve objects with condition 
exports.findAll = (req, res) => {
   const projectName = req.query.projectName;
   var condition = projectName ? { projectName: { [Op.like]: `%${projectName}%` } } : null;
 
   Project.findAll({ where: condition })
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving Projects."
       });
     });
 };

 //Retrieve a single object
 exports.findOne = (req, res) => {
   const id = req.params.id;
 
   Project.findByPk(id)
     .then(data => {
       if (data) {
         res.send(data);
       } else {
         res.status(404).send({
           message: `Cannot find Project with id=${id}.`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Error retrieving Project with id=" + id
       });
     });
 };

 //Update an object 
 exports.update = (req, res) => {
   const id = req.params.id;
 
   Project.update(req.body, {
     where: { id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "Project was updated successfully."
         });
       } else {
         res.send({
           message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Error updating Project with id=" + id
       });
     });
 };

 //Delete an object 
 exports.delete = (req, res) => {
   const id = req.params.id;
 
   Project.destroy({
     where: { id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "Project was deleted successfully!"
         });
       } else {
         res.send({
           message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete Project with id=" + id
       });
     });
 };

 //Delete all objects 
 exports.deleteAll = (req, res) => {
   Project.destroy({
     where: {},
     truncate: false
   })
     .then(nums => {
       res.send({ message: `${nums} Projects were deleted successfully!` });
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while removing all Projects."
       });
     });
 };

 //Find all objects by condition 
 exports.findAllPublished = (req, res) => {
   Project.findAll({ where: { published: true } })
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving Projects."
           
       });
     });
 };


 
