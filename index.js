
require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');

/// Load Controllers
const UserController = require("./controllers/user");

const app = express();

/// Post Body Parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


/// Routes
app.get("/users/:userId/verifyOTP", UserController.verifyOTP);
app.post("/users/generateOTP", UserController.generateOTP);
app.post("/users", UserController.createUser);


/// Handle 404 Error
app.use(function(req, res, next) {
    return res.status(404).send("Route does not exist");
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Started:\nAddress: http://localhost:${process.env.SERVER_PORT}\nENV: ${process.env.NODE_ENV}`);
})
