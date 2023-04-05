import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { config } from 'dotenv';
config();
import { Configuration, OpenAIApi } from 'openai';
import readline from 'readline';
const configuration = new Configuration({
  ApiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

const CrystalBall = ({ user, dob, sign }) => {

  const generateOpenAIResponse = () => {
    axios.get('/crystal-ball', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Tell me a joke!' }]
    })
      .then((response) => {
        console.log('this is the response from OpenAI: ', response);
      })
      .catch(err => console.error('an error has occurred with sending the GET request to openai: ', err));
  };


  return (
    <div>
      <h1>Gaze Into My Crystal Balls</h1>
      <button onClick={generateOpenAIResponse} >TEST</button>
    </div>
  );



};


export default CrystalBall;
