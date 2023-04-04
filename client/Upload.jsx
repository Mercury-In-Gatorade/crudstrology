
import React, { useEffect, useRef } from 'react';

const Upload = () =>{
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(()=>{
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'daxxxkleo',
      uploadPreset: 'm6dyasu6',

    }, function(error, result) {
      console.log(result);
    });
  }, []);

  return (
    <button onClick={()=>{ widgetRef.current.open(); }}>Upload</button>
  );
};




export default Upload;
