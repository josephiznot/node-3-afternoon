/*
    My postman collection had 0 fails but i was alerted with a message:
    "Something went wrong while running your scripts. Check Postman Console for more info."
    Might be due to my server runnning on port 3000 and my proxy being 3001.
    Need to ask Sensei Jin...
*/

require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const port = 3000;
const app = express();
//middleware
const checkForSession = require("./middlewares/checkForSession");
//controllers
const swag_controller = require("./controllers/swag_controller");
const auth_controller = require("./controllers/auth_controller");
const cart_controller = require("./controllers/cart_controller");
const search_controller = require("./controllers/search_controller");

app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

//swag
app.get("/api/swag", swag_controller.read);

//Auth
app.post("/api/login", auth_controller.login);
app.post("/api/register", auth_controller.register);
app.post("/api/signout", auth_controller.signOut);
app.get("/api/user/", auth_controller.user);

//Cart
app.post("/api/cart", cart_controller.add);
app.post("/api/cart/checkout", cart_controller.checkout);
app.delete("/api/cart", cart_controller.delete);

//Search
app.get("/api/search", search_controller.search);
app.listen(port, () => {
  console.log(`I am listening on port ${port}`);
});
