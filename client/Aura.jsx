import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from './Upload.jsx';
import { auraData } from '../database/auraData.js';
const Aura = () =>{
  //set the state to that image url
  const [image, setImage ] = useState(null);
  const [prediction, setPrediction ] = useState(null);
  const [aura, setAura ] = useState(null);
  //get the image from cloudinary
  const getImage = ()=>{
    axios.get('/img/allimages')
      .then((response)=>{
        setImage(response.data[0].url);
        setAura(randomAura);
      });
  };

  //random aura photo to overlay
  const randomAura = auraData[Math.floor(Math.random() * auraData.length)];

  const content = 'Pretend you are a medieval witch who gives fortunes and predictions. Make no mention of who you are, and no initial greetings, get right into the fortune of pretending you can see someones glowing colorful aura. Give a dramatic interpretation of what their aura means, give either an extremely dramatic positive interpretation or a dark negative one. Make no mention of what exact colors you see.';
  //GET future prediction from openai
  const getPrediction = () =>{
    axios.get(`/api/openai?content=${content}`)
      .then((response)=>{
        setPrediction(response.data.content);
      })
      .catch((err)=>{
        console.error('failed to get fortune', err);
      });
  };


  return (
    <div>
      <h1>Aura Time</h1>
      <Upload getImage={getImage}/>
      <button style={{color: 'black'}} onClick={getImage}>See yo Self</button>
      <button style={{color: 'black'}} onClick={getPrediction}>What Does It Mean</button>
      <div style={{position: 'relative'}}>
  <img src='https://i.imgur.com/LCN604d.png' style={{width: '100%'}} />
  <img src={image} style={{width: '70%',height:'65%', position: 'absolute', top: '49%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, boxShadow: '20px 20px 20px 20pxpx rgba(0,0,0,0.5) inset',
    borderRadius: '5px'}} />

        <img src={aura} style={{width: '70%',height:'65%', position: 'absolute', top: '49%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, opacity:'65%'}} />
        
      </div>
      <div>
        <h1>What It All Means</h1>
        <p>{prediction}</p>
      </div>
    </div>
  );
};







export default Aura;
