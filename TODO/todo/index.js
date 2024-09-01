const express = require("express");
const app = express();
app.use(express.json());
let initialTodo = [
  { title: "HTML", isCompleted: true, id: 1 },
  { title: "javascript", isCompleted: true, id: 2 },
  { title: "React", isCompleted: false, id: 3 },
];
app.get("/", (req, res) => {
  res.send("welcome to the todo api");
});

app.get("/todos", (req, res) => {
  res.send(initialTodo);
});

app.post("/addtodo", (req, res) => {
  let { title, isCompleted } = req.body;
  let todo = {
    title,
    isCompleted,
    id: initialTodo.length ? initialTodo[initialTodo.length - 1].id + 1 : 1,
  };
  initialTodo.push(todo);

  res.send(todo);
});

app.patch("/update/:id", (req, res) => {
  let { id } = req.params;
  const { title, isCompleted } = req.body;
  const todo = initialTodo.find((e) => e.id == id);
  if (todo) {
    if (title != null) todo.title = title;
    if (isCompleted != null) todo.isCompleted = isCompleted;
    res.send(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

app.delete("/delete/:id", (req, res) => {
  let { id } = req.params;
  let deletedTodo = initialTodo.find((e) => e.id == id);
  let todo = initialTodo.filter((e) => e.id != id);
  initialTodo = todo;
  res.send({ deletedTodo: deletedTodo, initialTodo: todo });
});

app.get("/todo/:id", (req, res) => {
  const { id } = req.params;
  const todo = initialTodo.find((e) => e.id == id);
  if (todo) {
    res.send(todo);
  } else {
    res.status(404).send("Todo Not Found !!!");
  }
});

app.get("/findbystatus", (req, res) => {
  let { isCompleted } = req.query;
  let todo = initialTodo.filter((e) => e.isCompleted.toString() == isCompleted);
  res.send(todo);
});

app.listen(8090, () => {
  console.log("Listening on 8090 port");
});
