import React, { useState, useEffect } from 'react';
import UserForm from './UserForm.jsx';

const YourFuture = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Please Fill Out All Fields Before Submitting Prepare for the Future</h1>
      <UserForm />
    </div>
  );
};

export default YourFuture;
