const express = require("express"); //setting up server
const app = express();

const bodyParser = require("body-parser");

const PORT = 5000;

//app.use is used to use middleware
//setting up bodyParser, it must be written before all routs that need it
app.use(bodyParser.urlencoded({ extended: false })); //urlencoded() allows us to access info from forms
app.use(bodyParser.json()); //json() allows us to parse json info from requests body

const router = require("./router"); //setting up router to store our routs code

app.use("/forcasts/", router); //all routs in the router will have /forcasts/ before each of them

//to render static files, put files in a folder called public
app.use(express.static("public"));

//when a get request is sent to the root route
app.get("/", (req, res) => {
  const d = new Date(); //make a new date
  res.json({ currentTime: d.toTimeString() }); //send back a response in json containing this object
  console.log("Recived a GET request");
});

//listening to server
app.listen(PORT, "127.0.0.1", () => {
  console.log(`server is listening on port ${PORT}...`);
});
