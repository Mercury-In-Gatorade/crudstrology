import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { config } from 'dotenv';
// config();
// import { Configuration, OpenAIApi } from 'openai';
// import readline from 'readline';
// const configuration = new Configuration({
//   ApiKey: process.env.OPENAI_API_KEY
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

const CrystalBall = ({ user, dob, sign }) => {

//shimmering fog gif (transparent?): https://thumbs.gfycat.com/DizzyBelovedHypsilophodon-max-1mb.gif

  const [crystalBallImage, setCrystalBallImage] = useState('https://i.imgur.com/XaWXuh1.gif');

  const getAIGeneratedFortuneImage = (content) => { //this freezes the page when called for some reason?
    axios.get(`/api/crystal-ball?content=${content}`)
      .then((response) => {
        // let url = response.data;
        setCrystalBallImage(response.data);
        console.log('this is the response from OpenAI: ', response);
      })
      .catch(err => console.error('an error has occurred with sending the GET request to openai: ', err));
  };


  return (
    <div>
      <h1>Gaze Into My Crystal Balls</h1>
      <button onClick={() => {
        prompt = 'Write a prompt to generate an AI image of a fortune teller';
        getAIGeneratedFortuneImage(prompt);
      }} >TEST</button>
      <section>
        <img
          src={crystalBallImage}
          alt="Your Fortune"
          width="500"
          height="600"
        />
      </section>

    </div>
  );



};


export default CrystalBall;
