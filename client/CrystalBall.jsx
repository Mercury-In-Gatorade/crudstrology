import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FortuneButton,
  FortuneButtonContainer,
  CrystalBallDisplay,
  FortuneImageDisplay,
  FortuneTellerBackground,
  CrystalBallImage,
} from './Styled.jsx';

const CrystalBall = ({ drawCards, user, sign, setSign, tarot }) => {
  //all black background: https://wallpaperaccess.com/full/38119.jpg
  //fortune teller hut background image: https://i.pinimg.com/originals/28/df/61/28df61933e9b931f843f03cfe28f8096.jpg
  //shimmering fog gif (transparent?): https://thumbs.gfycat.com/DizzyBelovedHypsilophodon-max-1mb.gif
  //other fog gif: https://i.imgur.com/XaWXuh1.gif
  //another swirling smoke gif: https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWExZDJmOTM1NzE4NzI1OWU5YWVjMmVlYjYxYjk3MzBjZTc0NTRjNiZjdD1n/ftfVpeWsm95QgGfOZ8/giphy.gif
  const [fortuneImage, setFortuneImage] = useState('');

  const getAIGeneratedFortuneImage = (content) => {
    //maybe set state to the swirling mist here, so it only appears on button press?
    axios
      .get(`/api/crystal-ball?content=${content}`)
      .then((response) => {
        // let url = response.data;
        setFortuneImage(response.data); //make this fade out mist/fade in picture somehow
      })
      .catch((err) =>
        console.error(
          'an error has occurred with sending the GET request to openai: ',
          err
        )
      );
  };

  const showFortune = (type) => {
    setFortuneImage('https://i.imgur.com/a74Pgfg.gif');
    drawCards();
    const starSign = sign || 'unknown';
    prompt = `Without mentioning Tarot cards, describe an abstract, dreamlike image representing a fortune for the ${type} of someone whose zodiac sign is ${starSign} based on this Tarot reading: Past: ${tarot[0].name}, Present: ${tarot[1].name}, Future: ${tarot[0].name}`;
    console.log(prompt);
    getAIGeneratedFortuneImage(prompt);
  };

  return (
    <FortuneTellerBackground>
      <h1>Gaze Into The Crystal Ball To Reveal Your Fate!</h1>
      <FortuneButtonContainer>
        <FortuneButton
          id='love-button'
          onClick={() => {
            showFortune('love life');
          }}
        >
          Love
        </FortuneButton>
        <FortuneButton
          id='career-button'
          onClick={() => {
            showFortune('career');
          }}
        >
          Career
        </FortuneButton>
        <FortuneButton
          id='secrets-button'
          onClick={() => {
            showFortune('mysteries of life');
          }}
        >
          Secrets
        </FortuneButton>
        <FortuneButton
          id='doom-button'
          onClick={() => {
            showFortune('doom');
          }}
        >
          DOOM!
        </FortuneButton>
      </FortuneButtonContainer>
      <CrystalBallImage>
        <CrystalBallDisplay
          src='https://media.istockphoto.com/id/933666298/photo/hands-on-crystal-ball-and-cryptocurrency.jpg?s=612x612&w=0&k=20&c=rWJ_caa0AZCHYB09wkcLRghIYGZmGqfYe8D2l1JNZE8='
          alt='The Crystal Ball!'
        />
        <FortuneImageDisplay
          onLoad={(e) => (e.target.style.opacity = 0.65)}
          src={fortuneImage}
          alt='Your Fortune!'
        ></FortuneImageDisplay>
      </CrystalBallImage>
    </FortuneTellerBackground>
  );
};

export default CrystalBall;

//crystal ball image:
//cloud mask png link: https://freesvg.org/img/Cloud-Silhouette.png
//CSS for fortune teller background image:  background-image: url('https://wallpaperaccess.com/full/38119.jpg');
