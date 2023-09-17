const express = require('express');
const axios = require('axios');
const router = express.Router();
const dummyjson = require('../dummyjson/card.json')

//Make request to pokeapi
//List all card URLs to user based on the name of the pokemon specified
//Return to user

//API URL: https://api.pokemontcg.io/v2/cards?q=name:x
//NO KEY REQUIRED FOR ACCESS

function transform(data){
  const images = []
  for (var i = 0; i < data.data.length; i++) {
      images.push(data.data[i].images.small)
  }
  return {images};
}

async function requestAPI(name) {
  const API_URL = "https://api.pokemontcg.io/v2/cards";
  const url = `${API_URL}?q=name:` + name
  return await axios.get(url)
    .then((res) => res.data)
    .then((res) => transform(res))
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

});

module.exports = router;