const express = require('express');
const axios = require('axios');
const router = express.Router();
const dummyjson = require('../dummyjson/colours.json');

//Make request to pokeapi
//List all colour options
//Return to user

//API URL: https://pokeapi.co/api/v2/pokemon-color
//NO KEY REQUIRED FOR ACCESS

//Reformat data structure
function transform(data){
  const idRegex = "\/([0-9]+)\/";
  const colours = {"colours": []};
  for (var i = 0; i < data.results.length; i++) {
    colours.colours.push({"id": data.results[i].url.match(idRegex)[1], "name": data.results[i].name})
  }
  return colours
}

//Make request to api

async function requestAPI() {
  const API_URL = "https://pokeapi.co/api/v2/";
  const url = `${API_URL}/pokemon-color/`
  return await axios.get(url)
    .then((res) => res.data)
    .then((res) => transform(res))
    .catch((err) => console.log(err.response))
}

router.get('/', function(req, res, next) {

  if (process.env.NODE_ENV === "development"){
    res.status(200).json(
      transform(dummyjson)
    )
  } else{
    requestAPI(req.query.id)
    .then(r => 
      res.status(200).json(
        r
      )
    ).catch((err) => {
      res.status(500).json(
        err
      )
    })
  }
  

})
 

module.exports = router;

/*

*/