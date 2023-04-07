// router
const express = require('express');
const External = express.Router();
const axios = require('axios');
const dotenv = require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
// const readline = 'readline';
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const { OPENAI_API_KEY, HORO_KEY } = process.env;

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

External.get('/crystal-ball', async (req, res) => {
  //console.log('this is what the request body looks like for the openAI GET request: ', req.body);
  await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: req.query.content }],
    max_tokens: 300
  })
    .then(({ data }) => {
      // openAIResponse = data.choices[0].message;
      // console.log('this is the response from the then statement: ', data.choices[0].message);
      console.log('This is the prompt for image creation: ', data.choices[0].message.content);
      openai.createImage({
        prompt: data.choices[0].message.content,
        n: 1,
        // size: '1024x1024'
      })
        .then(({ data }) => {
          console.log('this is data for image generation: ', data);
          res.status(200).send(data.data[0].url);
        })
        .catch(err => {
          console.error('an error occurred with creating image: ', err);
          res.sendStatus(500);
        });
      // res.status(200).send(data.choices[0].message);
    })
    .catch(err => {
      console.error('an error occurred with the POST request to openai: ', err);
      res.sendStatus(500);
    });
});


// API
External.post('/horo', (req, res) => {
  // console.log('____SERVER____');
  // console.log('REQ BODY', req.body);
  // const { user } = req.body;
  // console.log('USER DESTRUCTURED', user);
  // axios.post(`https://aztro.sameerkumar.website?sign=${user.sign}&day=today`)
  //   .then(result => {
  //     console.log('RESULT from Aztro API', result.data);
  //     result.data.sign = user.sign;
  //     res.status(200).send(result.data);
  //   })
  //   .catch(err => res.sendStatus(500)); // console.log('Error from Aztro api post request SERVER', err)
  const { sign } = req.body.user;
  let lowerCaseSign;
  sign ? lowerCaseSign = sign.toLowerCase() : null;

  const options = {
    method: 'GET',
    url: 'https://horoskopos.p.rapidapi.com/zodiac-signs/prediction',
    params: {sign: lowerCaseSign, day: 'today', lang: 'en', period: 'month'},
    headers: {
      'X-RapidAPI-Key': '253ff4744dmsh976b774f3e48267p189808jsnfd316ee46cf2',
      'X-RapidAPI-Host': 'horoskopos.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.error('error');
  });



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
