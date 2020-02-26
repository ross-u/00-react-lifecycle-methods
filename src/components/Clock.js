import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2020,
      timerId: null,                  //		<-- CREATE NEW PROPERTY
      timer: 0,                           //		<-- CREATE NEW PROPERTY
    };
    console.log('IN CONSTRUCTOR');
  }

  
  updateTimer = () => {                         //		<-- CREATE NEW METHOD
    this.setState({ timer: this.state.timer + 1 });
  };

  componentDidMount() {
    console.log('IN "COMPONENT DID MOUNT"');
    
    const timerId = setInterval(this.updateTimer, 1000);   // <-- CREATE AN INTERVAL
    this.setState({ year: this.props.currentYear, timerId }); // <-- SET timerId
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('IN "COMPONENT DID UPDATE"');

    if (prevProps.currentTime !== this.props.currentTime) {
      console.log('   RECEIVED NEW PROPS ! ! !');
    }
  }

  componentWillUnmount() {
    console.log('\n XXX  IN "COMPONENT WILL UNMOUNT"  XXX');
    clearTimeout(this.state.timerId);
  }

  render() {
    console.log('IN RENDER');

    return (
      <div>
        <h1>Clock</h1>

        <h2>Year</h2>
        <p>{this.state.year}</p>

        <h2>Current Time</h2>
        <p>
        {
          this.props.currentTime
            ? this.props.currentTime
            : "LOADING"
        }
        </p>

        <h2>Timer: {this.state.timer} </h2>                   {/*    <--  ADD       */}

      </div>
    );
  }
}

export default Clock;