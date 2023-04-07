import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [planetPicture, setPlanetPicture] = useState(null);
  const [planetDescription, setPlanetDescription] = useState(null);

  useEffect(() => {
    axios
      .get(
        'https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,eq,true'
      )
      .then((data) => {
        setPlanets(data.data.bodies);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  function getPicture(event) {
    axios
      .get(`https://planets-17f2.onrender.com/planets/getPlanet?name=${event}`)
      .then((data) => {
        setPlanetPicture(data.data.picture);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get(`/api/openai?content=give me a description of ${event}`)
      .then((response) => {
        setPlanetDescription(response.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className='container'>
      <h2>Click on a planet's name to get a picture and description</h2>
      <div className='planetsContainer'>
        <div className='table'>
          <table>
            <tr className='headers'>
              <th>Name</th>
              <th>Moons</th>
              <th>Mass</th>
              <th>Volume</th>
              <th>Density</th>
              <th>Gravity</th>
            </tr>
            {planets.length === 0 ? (
              <td>loading</td>
            ) : (
              planets.map((planet) => (
                <tr key={planet.englishName}>
                  <td onClick={() => getPicture(planet.englishName)}>
                    <a>{planet.englishName}</a>
                  </td>
                  <td>{planet.moons === null ? 0 : planet.moons.length}</td>
                  <td>{planet.mass.massValue}</td>
                  <td>{planet.vol.volValue}</td>
                  <td>{planet.density}</td>
                  <td>{planet.gravity}</td>
                </tr>
              ))
            )}
          </table>
        </div>
        <div className='photo'>
          <img src={planetPicture} />
        </div>
      </div>
      <div className='description'>
        <p>{planetDescription}</p>
      </div>
    </div>
  );
};

export default Planets;
