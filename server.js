const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Sets up the heroku and local mongodb server ports.
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
})

//Used to make the html and api routes available.
require("./routes/html_routes")(app);
require("./routes/api_routes")(app);

//Setsup the port that the server listens on.
app.listen(PORT, function () {
    console.log(`App listening on Port ${PORT}`);
});