const signinController = require("../controllers/signinController.js");
const { signUpController } = require("../controllers/signupController.js");
const todoController = require("../controllers/todoController.js");
const { verifyToken } = require("../utils.js");

const router = require("express").Router();

const checkAuthorization = (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split("Bearer ")[1];
    if (verifyToken(token)) {
      return next();
    }
  }
  console.log("Unauthorized request");
  return res.status(401).send({ message: "Unauthorized request" });
};

router.get("/getTodos", todoController.getAllTodos);
router.get("/getTodo/:id", todoController.getaTodo);
router.post("/addTodo", checkAuthorization, todoController.addTodo);
router.put("/updateTodo/:id", checkAuthorization, todoController.updateTodo);
router.delete("/deleteTodo/:id", checkAuthorization, todoController.deleteTodo);
router.get("/totallTodos", todoController.getTotalTodos);
router.post("/signin", signinController);
router.post("/signup", signUpController);
module.exports = router;
