const Charity = require("../models/Charity");

// show the list of interviews with optional search by nom_interviewer
const index = (req, res, next) => {
  // Extract search parameter (nom_interviewer) from the request
  const { nom_interviewer } = req.query;

  // Define a filter object based on nom_interviewer
  const filter = {};
  if (nom_interviewer) {
    // Perform a case-insensitive search on nom_interviewer field
    filter.nom_interviewer = { $regex: new RegExp(nom_interviewer, 'i') };
  }

  // Use the filter object in the find query
  Charity.find(filter)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(400).json({
        msg: "An error occurred!",
      });
    });
}

// show single User
const show = (req, res) => {
  const { id } = req.body;
  Charity.findById(id)
    .then((response) => {    
      
      res.status(200).send(
      JSON.stringify({
        //200 OK
        nom_interviewer: response.nom_interviewer,
        nom_interviewee: response.nom_interviewee,
        question: response.question,
        reponse: response.reponse,
      })
    );
    }).catch((error) => {
      res.status(400).json({
        msg: "An error occured!",
      });
    });
    
};

// add user in base
const Add = (req, res, next) => {
  let interview = new Charity({
    nom_interviewer: req.body.nom_interviewer,
    nom_interviewee: req.body.nom_interviewee,
    question: req.body.question,
    reponse: req.body.reponse,
    user: req.body.user,
  });
  interview
    .save()
    .then((data) => {
      res.json({
        msg: "interview added successfully!",
        data
      });
    })
    .catch((error) => {
      res.status(400).json({
        msg: "An error occured!",
      });
    });
};

// update user
const update = (req, res, next) => {
  let interviewId = req.body.interviewId;
  let updateData = {
    nom_interviewer: req.body.nom_interviewer,
    nom_interviewee: req.body.nom_interviewee,
    question: req.body.question,
    reponse: req.body.reponse,
  };
  Charity.findByIdAndUpdate(interviewId, { $set: updateData })
    .then((data) => {
      res.json({
        msg: "interview updated successfully!",
        data
      });
    })
    .catch((error) => {
      res.status(400).json({
        msg: "An error occured!",
      });
    });
};

// delete user
const destroy = (req, res, next) => {
  let interviewId = req.body.interviewId;
  Charity.findByIdAndRemove(interviewId)
    .then(() => {
      res.json({
        msg: "interview deleted successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        msg: "An error occured!",
      });
    });
};

module.exports = {
  index,
  show,
  Add,
  update,
  destroy,
};
