const users = require("../models/users"); //array of users
var id = 1;
module.exports = {
  login: (req, res, next) => {
    const { username, password } = req.body;
    const filtered = users.filter(
      client => client.username === username && client.password === password
    );
    // console.log(req.session);
    if (filtered) {
      req.session.user.username = filtered[0].username;
      res.status(200).send(req.session.user);
    } else {
      res.status(500).send("Wrong username or password");
    }
  },
  register: (req, res, next) => {
    const { username, password } = req.body;
    console.log(users);
    users.push({ id, username, password });
    id++;
    req.session.user.username = username;
    res.status(200).send(req.session.user);
  },
  signOut: (req, res, next) => {
    req.session.destroy();
    res.status(200).send(req.session);
  },
  getUser: (req, res, next) => {
    // const { id } = req.params;
    // const filtered = users.filter(user => user.id.toString() === id);
    // console.log(filtered[0]);
    // console.log(req.session.user);
    res.status(200).send(req.session.user);
  }
};
