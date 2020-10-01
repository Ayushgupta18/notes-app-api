const db = require("../models");
const User = db.user;

exports.addNote = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.userId},
        {$push:{notes:{"title":req.body.title,"content":req.body.content}}},
        {new: true}
    )
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            notes:user.notes
          });
        });

};
exports.modifyNote = (req, res) => {
  const note_id = req.params.note_id;
  User.findOneAndUpdate(
      {_id: req.userId},
      {$set:{'notes.$[i].content':req.body.content}},
      {arrayFilters:[{'i._id':note_id}], new: true}
  )
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send({
          id: user._id,
          username: user.username,
          notes:user.notes
        });
      });

};
exports.deleteNote = (req, res) => {
  const note_id = req.params.note_id;
  User.findOneAndUpdate(
      {_id: req.userId},
      {$pull:{'notes':{'_id':note_id}}},
      {new:true}
  )
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send({
          id: user._id,
          username: user.username,
          notes:user.notes
        });
      });

};