import React from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImgLinkForm from './components/ImgLinkForm/ImgLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'


const app1 = new Clarifai.App({
 apiKey: 'd2374cb5c0bc42abbeebc018f1f2a663'
});


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

class App extends React.Component {
  constructor(){
    super();
    this.state={
      input:'',
      imgUrl:''
    }
  }

  onInputChange = (event)=>{
    console.log(event.target.value);
    this.setState({input:event.target.value})
  }

  onSubmit = ()=>{
    console.log('click')
    this.setState({imgUrl:this.state.input})
    app1.models.predict(
      Clarifai.COLOR_MODEL,
      this.state.imgUrl, 
      {language: 'en'}
    )
    .then(
    function(response) {
      // do something with response
      console.log(response)
    },
    function(err) {
      // there was an error
      window.alert("An error has occured: "+err)
    }
    );
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImgLinkForm 
        onInputChange= {this.onInputChange} 
        onSubmit= {this.onSubmit}
        />	    
        <FaceRecognition imgUrl={this.state.imgUrl}/>
      </div>
    );
  }
}

export default App;
