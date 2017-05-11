import React, { Component } from 'react';
import { database } from './firebase';
import './App.css';

class App extends Component {
  // connect to firebase, and listen for changes
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    // whenever the value changes, this will be fired
    database.ref().on('value', (snapshot) => {
      this.setState({
        data: snapshot.val()
      });
      console.log('THE DATA CHANGED!', snapshot.val());
    });

  }

  render() {
    return (
      <div className="App">
        <div className="App--header">
          <h2>Welcome to React and Firebase</h2>
        </div>
        <pre className="App--data">
          { JSON.stringify(this.state.data, null, 2)}
        </pre>
      </div>
    );
  }
}

export default App;