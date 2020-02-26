import React from "react";
import "./App.css";
import Clock from "./components/Clock";

class App extends React.Component {
  state = {
    currentTime: "N/A",
    showClock: true
  };

  toggleClock = () => {
    this.setState({ showClock: !this.state.showClock });
  };

  updateTime = () => {
    const currentTime = new Date().toUTCString();
    this.setState({ currentTime })
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.toggleClock}>TOGGLE CLOCK</button>
        <button onClick={this.updateTime}>UPDATE TIME</button>


        {
          this.state.showClock
             ? <Clock currentYear={2020} currentTime={ this.state.currentTime }/> 
             : null
        }
      </div>
    );
  }
}

export default App;
