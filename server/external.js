// router
const express = require('express');
const External = express.Router();
const axios = require('axios');
const dotenv = require('dotenv').config();
const { OPENAI_API_KEY } = process.env;
const { Configuration, OpenAIApi } = require('openai');

// const { External } = Router();

// auth
require('./auth.js');

// middleware
External.use(express.json());
External.use(express.urlencoded({ extended: true }));

// *****************************
// ***** EXTERNAL API HITS *****
// *****************************

// API
External.get('/quotes', (req, res) => {
  axios.get('https://api.quotable.io/random')
    .then(result => res.status(200).send(result.data))
    .catch(err => res.status(500).send(err));
});

// API
External.post('/horo', (req, res) => {
  // console.log('____SERVER____');
  console.log('REQ BODY', req.body);
  const { user } = req.body;
  console.log('USER DESTRUCTURED', user);
  axios.post(`https://aztro.sameerkumar.website?sign=${user.sign}&day=today`)
    .then(result => {
      console.log('RESULT from Aztro API', result.data);
      result.data.sign = user.sign;
      res.status(200).send(result.data);
    })
    .catch(err => res.sendStatus(500)); // console.log('Error from Aztro api post request SERVER', err)
});

//Brandons openapi chat get request that he might wanna use for later idk
External.get('/openai', async (req, res)=>{
  
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  return openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: req.query.content}],
  })
    .then((response)=>{
      console.log(response.data.choices[0].message);
      res.send(response.data.choices[0].message).status(200);
    })
    .catch((err)=>{
      res.status(500);
      console.error('didnt work', err);
    });
});



module.exports = { External };
