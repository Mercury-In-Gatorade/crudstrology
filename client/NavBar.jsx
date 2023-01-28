import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavStyle, NavUl, NavUserInfo, NavImg } from './Styled.jsx';
import { UserContext } from './App.jsx';
import axios from 'axios';
import zc from '../utils/zodiacConverter.js';

const NavBar = () => {
  const { dob, setDob, sign, setSign, user } = useContext(UserContext);
  const viewObj = {};
  const dobRef = useRef('');
  const handleClick = (e, option) => {
    viewObj[option] = e.target.value;
  };

  const handleChange = (input) => {
    dobRef.current = input;
  };

  const handleSubmit = () => { //THIS FUNCTION GOOD TO FLESH OUT WITH AXIOS REQUEST TO SERVER TO SAVE DOB AND SIGN
    axios.get('/auth/user')
      .then((loggedInUser) => {
        //console.log('resobj:', loggedInUser.data)
        axios.patch(`/user/${loggedInUser.data.googleId}`, {dob: dobRef.current, sign: zc(dobRef.current) })
          .then((anArrayResponse) => {
            //call setters?           <-----Ben's trailing whitespace
            console.log('Updated User: ', anArrayResponse.data[0]);
            setDob(anArrayResponse.data[0].dob);
            setSign(zc(anArrayResponse.data[0].dob));
          })
          .catch(err => {
            console.log('failed to update in db', err);
          });
      })
      .catch(err => {
        console.log('failed to verify current user', err);
      });
  };
  const getAvatar = (googleName) => (
    <NavImg src={`https://robohash.org/${googleName}?set=set5`} />
  );
  // 'FatTubBetty'  name
  return (
    <>

      <NavStyle>
        <div>{getAvatar(user || 'FatTubBetty')}</div>
        <NavUserInfo>
          <hr />
          <p>Name: {user || 'sign in'}</p>
          <p>DOB:<input
            className='dobInput'
            style={{ color: 'black' }}
            placeholder={dob || 'Enter DOB as mm/dd'}
            onChange={
              (e) => {
                handleChange(e.target.value);
              }}
            onKeyDown={
              (e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }
            }
          />
          <button className='text' onClick={handleSubmit}>Submit</button></p>
          <p>Sign: {sign || 'Based on DOB'}</p>
          <hr />
        </NavUserInfo>

        <ul>
          <NavUl>
            <Link to="/" onClick={(e) => handleClick(e, 'Feed')}> Your Home </Link>
            <Link to="/astrology" onClick={(e) => handleClick(e, 'Scopes')}> Today's Horoscopes </Link>
            <Link to="/tarot" onClick={(e) => handleClick(e, 'Tarot')}> Get A reading </Link>
            <Link to="/favorites" onClick={(e) => handleClick(e, 'Favorites')}> Favorite Quotes </Link>

            {/* <Link to="/" onClick={(e) => handleClick(e, 'Dialog')}> Fortune Teller </Link>*/}
          </NavUl>
        </ul>


      </NavStyle >
    </>
  );
};

export default NavBar;
