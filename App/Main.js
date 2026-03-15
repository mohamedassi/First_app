import express from "express"

const app = express();
app.use(express.json());
const Port = process.env.PORT || 5000;

const users = [
  { id: 1, name: "Ali", age: 22 },
  { id: 2, name: "Sara", age: 25 },
  { id: 3, name: "Omar", age: 28 }
];

app.get("/api/users", (req, res) => {
  res.status(200).send({ users });
});

app.get("/api/users/:id", (req, res) => {

  const user = users.find(u => u.id === Number(req.params.id));

  res.status(200).send(user);

});
app.post("/api/users", (req, res) => {

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };

  users.push(newUser);

  res.status(201).send(newUser);

});
app.delete("/api/users/:id", (req, res) => {

  const userIndex = users.findIndex(u => u.id === Number(req.params.id));

  if (userIndex === -1) {
    return res.status(404).send({ message: "User does not exist" });
  }

  const deletedUser = users.splice(userIndex, 1);

  res.status(200).send({
    message: "User deleted successfully",
    user: deletedUser[0]
  });

});

app.listen(Port, () => {
  console.log(`Server Running on Port ${Port}`);
});