import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const Container = styled.div`
  background-color: black;
`;

const PlanetsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
`;

const TableDiv = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
`;

const Table = styled.table`
  margin-left: auto;
  margin-right: auto;
  border: 1px solid white;
  border-collapse: collapse;
  table-layout: auto;
  width: 20%;
  margin-bottom: 30px;
`;

const TableH = styled.th`
  margin: 10px;
  border: 1px solid white;
  border-collapse: collapse;
  text-align: left;
`;

const TableD = styled.td`
  margin: 10px;
  border: 1px solid white;
  border-collapse: collapse;
  text-align: left;
`;

const Photo = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  margin-top: 0px;
  text-alight: center;
`;


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
    <Container >
      <h2 className='title'>Click on a planet's name to get a picture and description</h2>
      <PlanetsContainer>
        <TableDiv>
          <Table >
            <tr className='headers'>
              <TableH>Name</TableH>
              <TableH>Moons</TableH>
              <TableH>Mass</TableH>
              <TableH>Volume</TableH>
              <TableH>Density</TableH>
              <TableH>Gravity</TableH>
            </tr>
            {planets.length === 0 ? (
              <td>loading</td>
            ) : (
              planets.map((planet) => (
                <tr key={planet.englishName}>
                  <TableD onClick={() => getPicture(planet.englishName)}>
                    <a>{planet.englishName}</a>
                  </TableD>
                  <TableD>{planet.moons === null ? 0 : planet.moons.length}</TableD>
                  <TableD>{planet.mass.massValue}</TableD>
                  <TableD>{planet.vol.volValue}</TableD>
                  <TableD>{planet.density}</TableD>
                  <TableD>{planet.gravity}</TableD>
                </tr>
              ))
            )}
          </Table >
        </TableDiv>
        < Photo>
          <img src={planetPicture} />
        </Photo>
      </PlanetsContainer>
      <div className='description'>
        <p>{planetDescription}</p>
      </div>
    </Container >
  );
};

export default Planets;
