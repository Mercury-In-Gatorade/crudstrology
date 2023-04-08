import React, { useState, useEffect, useContext } from 'react';
import TarotDeck from '../utils/tarot-images.json';
import NavBar from './NavBar.jsx';
import Astrology from './Astrology.jsx';
import Feed from './Feed.jsx';
import Tarot from './Tarot.jsx';
import Favorites from './Favorites.jsx';
import Aura from './Aura.jsx';
import CrystalBall from './CrystalBall.jsx';
import Planets from './Planets.jsx';
import YourFuture from './YourFuture.jsx';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

export const UserContext = React.createContext();

const App = () => {
  const [tarot, setTarot] = useState([]);
  const [fortune, setFortune] = useState([]);
  const [user, setUser] = useState();
  const [dob, setDob] = useState();
  const [sign, setSign] = useState();

  // this will append all USER state information (name, DOB, sign)
  useEffect(() => {
    axios
      .get('/auth/user')
      .then((user) => {
        setUser(user.data.name);
        setDob(user.data.dob); // May be null on initialization need logic in sub components accordingly
        setSign(user.data.sign); //see above comment^
      })
      .catch((err) => {
        console.log(
          'Error fetching Authenticated Google User from req.user (server/passport)',
          err
        );
      });
  }, []);

  const drawCards = () => {
    setFortune([]);
    axios
      .get('/db/tarot')
      .then(({ data }) => {
        setTarot(() => [...data]);
        data.forEach((drawnCard, i) => {
          // console.log('FIRST forEach, drawnCard', drawnCard);
          TarotDeck.cards.forEach((deckCard) => {
            if (deckCard.name === drawnCard.name) {
              setFortune((prevFortune) => [
                ...prevFortune,
                deckCard.fortune_telling[i],
              ]); // change to [i]
              return;
            }
          });
        });
      })
      .catch((err) => console.log('ERROR in useEffect in Tarot.jsx: ', err));
  };

  return (
    <>
      <UserContext.Provider value={{ user, dob, setDob, sign, setSign }}>
        <div>
          <NavBar />
        </div>
        <div>
          <Routes>
            <Route path='/' element={<Feed />} />
            <Route path='/astrology' element={<Astrology />} />
            <Route
              path='/tarot'
              element={
                <Tarot
                  drawCards={drawCards}
                  tarot={tarot}
                  setTarot={setTarot}
                  fortune={fortune}
                  setFortune={setFortune}
                />
              }
            />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/aura' element={<Aura />} />
            <Route
              path='/crystal-ball'
              element={
                <CrystalBall
                  drawCards={drawCards}
                  tarot={tarot}
                  user={user}
                  sign={sign}
                  setDob={setDob}
                  setSign={setSign}
                />
              }
            />
            <Route path='/planets' element={<Planets />} />
            <Route path='/toms' element={<YourFuture />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </>
  );
};

export default App;
