import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo'
import ImgLinkForm from "./components/ImgLinkForm/ImgLinkForm.js";
import Rank from "./components/Rank/Rank.js";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import SignIn from "./components/SignIn/SignIn.js";
import Register from "./components/Register/Register.js";
import "./App.css";

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5,
      },
    },
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    size: {
      value: 2,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
    },
  },
};


const initialState = {
  input: "",
  imgUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
      isSignedIn: false,
    };
  };

  displayBox = (box) => {
    //console.log(box)
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  // signOut(){
  //   console.log(this.state)
  //   this.setState({isSignedIn:false})
  // }

  onPictureSubmit = () => {
    //console.log('click')
    this.setState({ imgUrl: this.state.input });
    fetch("https://still-basin-17296.herokuapp.com/imageurl", {
      method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://still-basin-17296.herokuapp.com/image", {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayBox(this.calculateFaceLocation(response))
      })
      .catch((err) => window.alert("An error has occured: " + err));
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      console.log(this.state);
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  render() {
    const { isSignedIn, route, box, imgUrl } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          // signOut= {this.signOut}
        />
        {route === "home" 
        ? <div>
            <Logo/>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImgLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onPictureSubmit}
            />
            <FaceRecognition box={box} imgUrl={imgUrl} />
          </div>
        :( route === "signin" 
          ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> 
          : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}

export default App;
