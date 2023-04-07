import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CrystalBallDisplay, FortuneImageDisplay } from './Styled.jsx';

const CrystalBall = ({ drawCards, user, sign, setSign, tarot }) => {
  //all black background: https://wallpaperaccess.com/full/38119.jpg
  //fortune teller hut background image: https://i.pinimg.com/originals/28/df/61/28df61933e9b931f843f03cfe28f8096.jpg
  //shimmering fog gif (transparent?): https://thumbs.gfycat.com/DizzyBelovedHypsilophodon-max-1mb.gif
  //other fog gif: https://i.imgur.com/XaWXuh1.gif
  //another swirling smoke gif: https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWExZDJmOTM1NzE4NzI1OWU5YWVjMmVlYjYxYjk3MzBjZTc0NTRjNiZjdD1n/ftfVpeWsm95QgGfOZ8/giphy.gif
  const [fortuneImage, setFortuneImage] = useState(
    'https://thumbs.gfycat.com/DizzyBelovedHypsilophodon-max-1mb.gif'
  );

  const getAIGeneratedFortuneImage = (content) => {
    //maybe set state to the swirling mist here, so it only appears on button press?
    axios
      .get(`/api/crystal-ball?content=${content}`)
      .then((response) => {
        // let url = response.data;
        setFortuneImage(response.data); //make this fade out mist/fade in picture somehow
        console.log('this is the response from OpenAI: ', response);
      })
      .catch((err) =>
        console.error(
          'an error has occurred with sending the GET request to openai: ',
          err
        )
      );
  };

  const showFortune = (type) => {
    drawCards();
    const starSign = sign || 'unknown';
    prompt = `Without mentioning Tarot cards, describe an abstract, dreamlike image representing a fortune for the ${type} of someone whose zodiac sign is ${starSign} based on this Tarot reading: Past: ${tarot[0].name}, Present: ${tarot[1].name}, Future: ${tarot[0].name}`;
    console.log(prompt);
    getAIGeneratedFortuneImage(prompt);
  };

  return (
    <div id='fortuneteller-background'>
      <h1>Gaze Into The Crystal Ball To Reveal Your Fate!</h1>
      <button
        class='fortune-button'
        id='fortune-button-love'
        onClick={() => {
          showFortune('love life');
        }}
      >
        Love
      </button>
      <button
        class='fortune-button'
        id='fortune-button-career'
        onClick={() => {
          showFortune('career');
        }}
      >
        Career
      </button>
      <button
        class='fortune-button'
        id='fortune-button-mystery'
        onClick={() => {
          showFortune('mysteries of life');
        }}
      >
        Secrets
      </button>
      <button
        class='fortune-button'
        id='fortune-button-doom'
        onClick={() => {
          showFortune('doom');
        }}
      >
        DOOM!
      </button>
      <section id='crystal-ball-image'>
        <CrystalBallDisplay
          src='https://media.istockphoto.com/id/933666298/photo/hands-on-crystal-ball-and-cryptocurrency.jpg?s=612x612&w=0&k=20&c=rWJ_caa0AZCHYB09wkcLRghIYGZmGqfYe8D2l1JNZE8='
          alt='The Crystal Ball!'
        />
        <FortuneImageDisplay src={fortuneImage} alt='Your Fortune!' />
      </section>
    </div>
  );
};

export default CrystalBall;

//old image tag for crystal ball: <img id='crystal-ball-image' src={crystalBallImage} alt='The Crystal Ball!' />
