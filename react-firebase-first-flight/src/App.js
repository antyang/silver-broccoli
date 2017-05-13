import React, { Component } from 'react';
import { database } from './firebase';
import './App.css';

class App extends Component {
  // connect to firebase, and listen for changes
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      newData: '',
    };

    this.dataRef = null;

    // binding
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.dataRef = database.ref('/WOW/LOL/OMG')
    // whenever the value changes
    // change the state of the component
    // set data to current snapshot value

    // this.dataRef.on(...)

    database.ref().on('value', (snapshot) => {
      this.setState({
        data: snapshot.val()
      });
      console.log('THE DATA CHANGED!', snapshot.val());
    });
  }

  handleChange(event) {
    const newData = event.target.value;
    console.log('HANDLING CHANGE:', newData);
    this.setState({
      newData: newData
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // this.dataRef.push(...)

    const newData = database.ref('/NEWDATA/this/is/amazing')
                            // .child('NEWDATA')
                            .push(this.state.newData);
    // this.state.newData = '';
    this.setState({
      newData: ''
    })
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
        <form className="App--form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.newData} onChange={this.handleChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;