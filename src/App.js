import React from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImgLinkForm from './components/ImgLinkForm/ImgLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import './App.css';


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
      imgUrl:'',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width)
    const height = Number(image.height)
    return{
      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height- (clarifaiFace.bottom_row * height),
      isSignedIn: false
    }
  }

  displayBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (event)=>{
    console.log(event.target.value);
    this.setState({input:event.target.value})
  }

  onSubmit = ()=>{
    console.log('click')
    this.setState({imgUrl:this.state.input})
    app1.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input, 
      {language: 'en'}
    )
    .then(response => this.displayBox(this.calculateFaceLocation(response)))
    .catch(err => window.alert("An error has occured: "+err))
  }

  onRouteChange = (route) =>{
    if (route === 'signin'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render(){
    const {isSignedIn, route, box, imgUrl} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange= {this.onRouteChange} />
        {this.state.route ==='home' 
          ?<div>
              <Logo/>
              <Rank/>
              <ImgLinkForm 
                onInputChange= {this.onInputChange} 
                onSubmit= {this.onSubmit}
              />	    
              <FaceRecognition box= {box} imgUrl={imgUrl}/>
            </div>
          :(route === 'signin' 
              ?<SignIn onRouteChange={this.onRouteChange}/>
              :<Register/>
          )
        }
      </div>
    );
  }
}

export default App;
