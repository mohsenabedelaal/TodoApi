const db = require("../models");

// create main model
const Todo = db.todos;

// main work
// 1. create task

const addTodo = async (req, res) => {
  let info = {
    task: req.body.task,
    isCompleted: req.body.is_completed,
  };
  if (
    typeof req.body.task != "string" &&
    typeof req.body.isCompleted != "boolean"
  )
    throw "invalid parameters passed";

  const todo = await Todo.create(info).catch((error) => {
    console.log("Error" + error);
  });
  res.status(201).send(todo);
};

// 2. get all todos

const getAllTodos = async (req, res) => {
  var queryCondition = {};
  if ("showCompleted" in req.query && req.query.showCompleted == "true") {
    queryCondition = { where: { isCompleted: true } };
  } else if (
    "showCompleted" in req.query &&
    req.query.showCompleted == "false"
  ) {
    queryCondition = { where: { isCompleted: false } };
  }
  let todos = await Todo.findAll(queryCondition).catch((error) => {
    console.log("error" + error);
  });
  res.status(200).send({ todos: todos ? todos : [] });
};
// 3. get single todos

const getaTodo = async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    throw "ID is not a number ";
  }
  if (id < 0) throw "ID must be larger than 0";
  const todo = await Todo.findOne({ where: { id: id } }).catch((error) => {
    console.log("Error" + error);
  });
  res.status(200).send(todo);
};
// 4. update todo

const updateTodo = async (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    throw "ID is not a number";
  }
  if (id < 0) throw "ID must be greater than 0";
  const todo = await Todo.update(
    { isCompleted: req.body.isCompleted, task: req.body.task },
    { where: { id: id } }
  ).catch((error) => {
    console.log("Error" + error);
  });
  res.status(200).send(todo);
};

// 5. get single todos

const deleteTodo = async (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    throw "ID is not a number";
  }
  if (id < 0) throw "ID must be greater than 0";
  await Todo.destroy({ where: { id: id } }).catch((error) => {
    console.log("Error" + error);
  });
  res.status(200).send("Todo is deleted successfully");
};
// 6. get totall of todos

const getTotalTodos = async (req, res) => {
  const totalTodos = await Todo.count().catch((error) => {
    console.log("Error" + error);
  });
  res.status(200).send({ total: totalTodos });
};

const getProducts = async (req, res) => {
  const products = await Product.findAll({
    include: { model: User, required: true },
  }).catch((error) => {
    console.log("Error" + error);
  });
  res.status(200).send({ products: products });
};

module.exports = {
  addTodo,
  getAllTodos,
  getaTodo,
  updateTodo,
  deleteTodo,
  getTotalTodos,
  getProducts,
};
