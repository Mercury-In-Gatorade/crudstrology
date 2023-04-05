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

const CrystalBall = ({ drawCards, user, sign, setSign, tarot }) => {

  //shimmering fog gif (transparent?): https://thumbs.gfycat.com/DizzyBelovedHypsilophodon-max-1mb.gif
  //other fog gif: https://i.imgur.com/XaWXuh1.gif
  const [crystalBallImage, setCrystalBallImage] = useState('https://media.istockphoto.com/id/933666298/photo/hands-on-crystal-ball-and-cryptocurrency.jpg?s=612x612&w=0&k=20&c=rWJ_caa0AZCHYB09wkcLRghIYGZmGqfYe8D2l1JNZE8=');

  // useEffect(() => {
  //   axios.get('/auth/user')
  //     .then(user => {
  //       setDob(user.data.dob);
  //       setSign(user.data.sign);
  //     })
  //     .catch(err => {
  //       console.log('Error fetching Authenticated Google User from req.user (server/passport)', err);
  //     });
  // });

  const getAIGeneratedFortuneImage = (content) => { //this freezes the page when called for some reason?
    //maybe set state to the swirling mist here, so it only appears on button press?
    axios.get(`/api/crystal-ball?content=${content}`)
      .then((response) => {
        // let url = response.data;
        setCrystalBallImage(response.data); //make this fade out mist/fade in picture somehow
        console.log('this is the response from OpenAI: ', response);
      })
      .catch(err => console.error('an error has occurred with sending the GET request to openai: ', err));
  };

  const showFortune = (type) => {
    drawCards();
    let starSign = sign || 'unknown';
    prompt = `Without mentioning Tarot cards, describe an abstract, dreamlike image representing a fortune for the ${type} of someone whose zodiac sign is ${starSign} based on this Tarot reading: Past: ${tarot[0].name}, Present: ${tarot[1].name}, Future: ${tarot[0].name}`;
    console.log(prompt);
    getAIGeneratedFortuneImage(prompt);
  };

  return (
    <div>
      <h1>Gaze Into The Crystal Ball To Reveal Your Fate!</h1>
      <button onClick={() => {
        showFortune('test');
      }} >TEST</button>
      <button onClick={() => {
        showFortune('love life');
      }}
      >Love</button>
      <button onClick={() => {
        showFortune('career');
      }} >Career</button>
      <button onClick={() => {
        showFortune('mysteries of life');
      }} >Secrets</button>
      <button onClick={() => {
        showFortune('doom');
      }} >DOOM!</button>
      <section>
        <img
          src={crystalBallImage}
          alt="Your Fortune"
        />
      </section>

    </div>
  );



};


export default CrystalBall;
