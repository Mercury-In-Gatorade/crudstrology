import styled from 'styled-components';

const QuoteButton = styled.button`
  cursor: pointer;
  border: 0.2rem solid;
  border-color: azure;
  padding: 0.5rem;
  align-self: center;
  transition: all 0.3s;
  &:hover {
    border-color: #8a04dd;
    box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem #5d0593;
    transform: scale(0.8);
  }
`;

const DeleteButton = styled.button`
  cursor: pointer;
  border: 0.2rem solid;
  background-color: darkslategrey;
  border-color: azure;
  padding: 0.5rem;
  align-self: center;
  transition: all 0.3s;
  &:hover {
    background-color: #cc0000;
    border-color: #520000;
    box-shadow: #7e0015;
    transform: scale(0.9);
  }
`;

const NavStyle = styled.div`
  display: block;
  color: midnightblue;
  padding: 40px;
  margin: -10px 0;
  border-top: 10px solid midnightblue;
  border-bottom: 10px solid midnightblue;
  background-color: darkslategrey;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const WrapCardText = styled.p`
  word-break: break-all;
  white-space: normal;
  display: block;
  max-height: 21px;
`;

const NavItem = styled.div`
  background-color: midnightblue;
  border: 0.9rem solid midnightblue;
  position: relative;
  font-size: 1.5rem;
  text-align: center;
  flex: 1 1;
  margin: 1rem;
  text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
  &:hover {
    border-color: #8a04dd;
    color: #8a04dd;
    box-shadow: 0.05rem 0.05rem 0.05rem 0.05rem #5d0593;
    transform: scale(0.95);
  }
`;

const NavUserInfo = styled.div`
  font-size: 1rem;
  flex: 1 1;
  display: block;
  min-height: 206px;
  max-height: 206px;
  min-width: 275px;
  width: 100%;
  padding: 3rem;
  text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
  border: 1px solid azure;
`;

const NavImg = styled.img`
  width: 100%;
  margin-top: 0.3rem;
  height: auto;
  border: 1px solid azure;
  background-color: black;
`;

const AstroButton = styled.button`
  display: flex;
  font-size: 1rem;
  align-items: center;
  padding: 0.1rem;
  cursor: pointer;
`;

const UserHoro = styled.div`
  object-fit: cover;
  border: 3px groove azure;
  background-color: black;
  margin-top: 20px;
  margin-left: 5px;
  font-size: 20px;
  padding: 10px;
`;

const OtherHoros = styled.div`
  object-fit: cover;
  border: 3px double azure;
  background-color: rgb(60, 60, 60);
  margin-top: 10px;
  margin-left: 5px;
  font-size: 14px;
  padding: 10px;
`;

const TarotCard = styled.div`
  background-color: black;
  border: 0.15rem groove azure;
  margin: 0.6rem;
  padding: 0.5rem;
`;

const Reading = styled.div`
  background-color: grey;
  border: 0.4rem double white;
  margin: 0.6rem;
  padding: 0.5rem;
`;

const CrystalBallDisplay = styled.img`
  display: block;
  width: 1250px;
  height: 1000px;
`;

// width: 75%;
// position: relative;

const FortuneImageDisplay = styled.img`
  height: 30%;
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// -webkit-mask-image: (black, transparent);
// mask-image: (black, transparent);
// -webkit-mask-image: url('');
// -webkit-mask-size: contain;
// -webkit-mask-repeat: no-repeat;
// -webkit-mask-position: bottom;
// display: flex;
// justify-content: center;

const FortuneTellerBackground = styled.div`
  background-image: url('https://wallpaperaccess.com/full/38119.jpg');
  background-size: 100% 100%;
`;

const CrystalBallImage = styled.section`
  position: relative;
  display: inline-block;
`;

export {
  NavStyle,
  NavItem,
  NavUserInfo,
  NavImg,
  AstroButton,
  UserHoro,
  OtherHoros,
  TarotCard,
  WrapCardText,
  Reading,
  QuoteButton,
  DeleteButton,
  CrystalBallDisplay,
  FortuneImageDisplay,
  FortuneTellerBackground,
  CrystalBallImage,
};
