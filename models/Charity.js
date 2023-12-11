const {Schema, model} = require('mongoose');

const CharitySchema = Schema(
  {
    nom_interviewer: {
      type: String,
    },
    nom_interviewee: {
      type: String,
    },

    question: {
      type: String,
    },

    reponse: {
      type: String,
    },
   user: {
    type: String,
    },
  },
  { timeStamps: true }
);

module.exports = model("Interview", CharitySchema);
