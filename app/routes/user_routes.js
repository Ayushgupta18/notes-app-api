const { authJwt } = require("../middlewares");
const controller = require("../controllers/user_controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.put("/api/user/addnote", [authJwt.verifyToken], controller.addNote);
    app.patch("/api/user/modifynote/:note_id", [authJwt.verifyToken], controller.modifyNote);
    app.patch("/api/user/deletenote/:note_id", [authJwt.verifyToken], controller.deleteNote);

  };