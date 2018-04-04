const swag = require("../models/swag");
//exports a giant object..
module.exports = {
  search: (req, res, next) => {
    const { category } = req.query;
    if (!category) {
      res.status(200).send(swag);
    } else {
      /*if i make a post get request for http://localhost:3000/api/search/?category= AFTER i have
      made a get request for http://localhost:3000/api/search/?category=hats, i still get the swag
      array of hats. I want to get EVERYTHING when category does not equal anything. ei===>>>
      (http://localhost:3000/api/search/?category=)
      */
      const filtered = swag.filter(e => (e.category = category));
      res.status(200).send(filtered);
    }
  }
};
