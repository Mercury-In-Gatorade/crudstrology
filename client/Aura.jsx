import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from './Upload.jsx';
import RingLoader from 'react-spinners/RingLoader';
import { Howl, Howler } from 'howler';
import { auraData } from '../database/auraData.js';
const Aura = () => {
  //set the state to that image url
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [aura, setAura] = useState(null);
  const [buttonClick, setButtonClick] = useState(false);

  const audio = new Audio('./audio/magic.mp3');

  //get the image from cloudinary
  const getImage = () => {
    axios
      .get('/img/allimages')
      .then((response) => {
        setImage(response.data[0].url);
        setAura(randomAura);
        audio.play();
      })
      .then(() => {
        setButtonClick(true);
        getPrediction();
      });
  };

  //random aura photo to overlay
  const randomAura = auraData[Math.floor(Math.random() * auraData.length)];

  const content =
    'Pretend you are a medieval witch who gives fortunes and predictions. Make no mention of who you are, and no initial greetings, get right into the fortune of pretending you can see someones glowing colorful aura. Give a dramatic interpretation of what their aura means, give either an extremely dramatic positive interpretation or a dark negative one. Make no mention of what exact colors you see.';
  //GET future prediction from openai
  const getPrediction = () => {
    axios
      .get(`/api/openai?content=${content}`)
      .then((response) => {
        setPrediction(response.data.content);
      })
      .catch((err) => {
        console.error('failed to get fortune', err);
      });
  };

  if (prediction) {
    return (
      <div style={{backgroundImage: 'url(\'https://media.giphy.com/media/MXQnyEQwBJ6eTj90L5/giphy-downsized-large.gif\')'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h1>Reveal Your Inner Light</h1>

        </div>
        <div style={{ position: 'relative' }}>
          <img
            src='https://i.imgur.com/LCN604d.png'
            style={{ width: '100%' }}
          />
          <img
            src={image}
            style={{
              width: '70%',
              height: '65%',
              position: 'absolute',
              top: '49%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              boxShadow: '20px 20px 20px 20pxpx rgba(0,0,0,0.5) inset',
              borderRadius: '5px',
            }}
          />

          <img
            src={aura}
            style={{
              width: '70%',
              height: '65%',
              position: 'absolute',
              top: '49%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              opacity: '0',
              transition: 'opacity 3s ease-in-out'
            }}
            onLoad={(e) => e.target.style.opacity = 0.65}
          />
        </div>
        <h1 style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>What It All Means</h1>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'black', borderRadius: '20px', marginLeft: '50px', marginRight: '50px', opacity: '80%'}}>
          <p style={{padding: '40px'}}>{prediction}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{backgroundImage: 'url(\'https://media.giphy.com/media/MXQnyEQwBJ6eTj90L5/giphy-downsized-large.gif\')', width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

          <h1>Reveal Your Inner Light</h1>
          <Upload getImage={getImage} />
          <button style={{ color: 'black' }} onClick={getImage}>
          See Thyself
          </button>
        </div>
        {buttonClick ? (
          <>
            <div style={{ position: 'relative' }}>
              <img
                src='https://i.imgur.com/LCN604d.png'
                style={{ width: '100%' }}
              />
              <div
                className='Loading'
                style={{
                  width: '70%',
                  height: '65%',
                  position: 'absolute',
                  top: '70%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <RingLoader color='#d7b7' />
                  <p style={{ textAlign: 'center' }}>
                    The Spirits Are Analyzing You...
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
};

export default Aura;
