const swag = require("../models/swag");

module.exports = {
  add: (req, res, next) => {
    const { id } = req.query;
    const { user } = req.session;
    const filtered = user.cart.filter(e => e.id == id);
    if (id === filtered) {
      res.status(200).send(user);
    } else {
      //keeps adding the item regardless if it is in cart already or not
      //Need to ask how to get rid of it.
      const swagFilter = swag.filter(e => e.id == id);
      user.cart.push(swagFilter[0]);
      user.total += swagFilter[0].price;
      res.status(200).send(user);
    }
  },
  delete: (req, res, next) => {
    //cannot destructore object when you are modifything them, will not update entire object's root
    const { id } = req.query;
    const { cart } = req.session.user;
    var totalVar = 0;
    req.session.user.cart = cart.filter(e => e.id != id);
    req.session.user.total = req.session.user.cart.map(
      e => (totalVar += e.price)
    );
    req.session.user.total = totalVar;
    res.status(200).send(req.session.user);
  },
  checkout: (req, res, next) => {
    req.session.user.cart = [];
    req.session.user.total = 0;
    res.status(200).send(req.session.user);
  }
};
