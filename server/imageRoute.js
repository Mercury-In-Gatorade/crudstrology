
const axios = require('axios');
const dotenv = require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env;


router.get('/allimages', (req, res)=>{
  axios.get(`https://${CLOUDINARY_API_KEY}:${CLOUDINARY_SECRET}@api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/resources/image`)
    .then((response)=>{
      res.send(response.data.resources).status(200);
    })
    .catch((err)=>{
      res.sendStatus(500);
      console.error('couldn\'t get the images', err);
    });

});
 


module.exports = router; 
