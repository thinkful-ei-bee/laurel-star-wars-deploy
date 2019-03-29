import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    names: [],
    description: [],
    movies: [],
  }

  userSearch() {
    //this is allowing the user to search for a character by name
    fetch(`https://swapi.co/api/people/?search=${name}`, {
      method: 'GET',
      //headers is from the API documentation
      headers: {
        'Content-Type': 'application/json'
      }
    })
    //error handling
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => userResults(responseJson))
    .catch(console.error)
  }

  userResults() {
    return (
      <li></li>
    )
  }
  
  render() {
    return (
      <div className="App">
       <header>
         <h1>Star Wars Characters</h1>
       </header>
       <section>
          <h2>Search for the characters you love:</h2>
        <form onSubmit={this.userSearch}>
         <label htmlFor="name-searching">
          Find your favorite characters here.
         </label>
         <input type="text"></input>
         <button type="submit">
            Go!
         </button>
        </form>
        </section>
      <section>
        {this.userResults()}
      </section>
      </div>
    );
  }
}

export default App;
