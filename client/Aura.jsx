import React, { useState, useEffect } from 'react';
import {CloudinaryImage} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from '@cloudinary/base';
import {fill} from '@cloudinary/url-gen/actions/resize';
import Upload from './Upload.jsx';

const Aura = () =>{

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'daxxxkleo'
    }
  });
  const myImage = cld.image('sample'); 
console.log(<AdvancedImage cldImg={myImage} />)
  // Resize to 250 x 250 pixels using the 'fill' crop mode.
  myImage.resize(fill().width(250).height(250));

  return (
    <div>
      <h1>Aura Time</h1>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
};







export default Aura;
