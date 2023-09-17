const express = require('express');
const axios = require('axios');
const dummyjson = require('../dummyjson/pokemon.json')
const router = express.Router();

//Make request to pokeapi
//List all pokemon of the colour name based on the specified id
//Return to user

//API URL: https://pokeapi.co/api/v2/pokemon-color/x
//NO KEY REQUIRED FOR ACCESS

function transform(data){
  
  const idRegex = "\/([0-9]+)\/";
  const mons = {
    "name": data.name,
    "pokemon": []};
  for (var i = 0; i < data.pokemon_species.length; i++) {
    mons.pokemon.push({"id": data.pokemon_species[i].url.match(idRegex)[1], "name": data.pokemon_species[i].name})
  }
  return mons
}

async function requestAPI(id) {
  const API_URL = "https://pokeapi.co/api/v2/";
  const url = `${API_URL}/pokemon-color/` + id
  return await axios.get(url)
    .then((res) => res.data)
    .then((res) => transform(res))
}

router.get('/', function(req, res, next) {

  // DELETE BEFORE SUBMISSION

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