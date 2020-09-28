import React from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImgLinkForm from './components/ImgLinkForm/ImgLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions ={
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    },
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    size: {
        value: 2
    }
  },
  interactivity: {
      events: {
          onhover: {
              enable: true,
              mode: "repulse"
          }
      }
  }
}

function App() {
  return (
    <div className="App">
      <Particles className='particles' params={particlesOptions}/>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImgLinkForm/>	    
      {/* <FaceRecognition/> */}
    </div>
  );
}

export default App;
