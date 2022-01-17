const express = require("express");
const fetch = require("node-fetch");

let router = express.Router(); //setting up a router

//when a get request is sent to the route
//the /: in the route is put there to make dynamic routes instead of hard codded routes,
//it means get the route starting with a / AND anything after,
//which means it is prefered to have dynamic routs at the bottom, as express runs from top to bottom
router.get("/:locationName", (req, res) => {
  //get the dynamic route value of the variable  we created called locationName from the request parameters
  const locationName = req.params.locationName;
  console.log(locationName);

  //To retreave the woeid of a location name
  //adding the location name that we obtained from the request to the end of the API url
  const url =
    "https://www.metaweather.com/api/location/search/?query=" + locationName;

  let woeid; //where on earth identfier

  fetch(url) //fetching the url will return a promise
    .then((response) => {
      return response.json(); //after the promise is resolved , return a promise that is resolved with the response body parsed as json
    })
    .then((data) => {
      console.log("data from fetch: ", data); //when then response.json() promise is resloved, console log that resolution or data

      //as location names arnt unique , the data will alwys be an array of objects
      woeid = data[0].woeid; //get the Where on earth Identfier of the first element and set the woeid to it

      //now that we have the woeid, we want the location weather data
      let url2 = "https://www.metaweather.com/api/location/" + woeid + "/"; //we use te woeid in a new url

      //now we fetch the new url
      fetch(url2) //it will return a promise
        .then((r) => {
          //after the promise is resloved
          return r.json(); //we make a promise which will be resolved by the parsed body into json
        })
        .then((d) => {
          //when the json promise is resloved , we take the resolution which is json now
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(d); //and we send back the json to the GET requester
        })
        .catch((err) => {
          //if the fetch url2 promise didnt reslove or was rejected
          console.log(err); //console log the error
        });
    })
    .catch((err) => {
      //if the fetch url promise didnt reslove or was rejected
      // console.log(err); //console log the error
      res.status(400).send({ message: "Not a city!" });
    });
});

module.exports = router; //exporting router
