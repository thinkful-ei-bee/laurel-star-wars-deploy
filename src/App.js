import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    names: [],
    description: []
  }

  userSearch = (event) => {
    event.preventDefault();
    const characterName = event.target.characterNameSearch.value;
    //this is allowing the user to search for a character by name
    fetch(`https://swapi.co/api/people/?search=${characterName}`, {
      method: 'GET',
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
    .then(data => {
      console.log(data);
      let search = []
      for(let i = 0; i < data.results.length; i++) {
        search.push(data.results[i].name)
      }
      this.setState({
        names: search
      })
    })
    .catch(console.error)
  }

  userResults(characterName) {
    //console.log('hi');
    return (
      // this is mapping through the variable set in the render
      <ul>
        {characterName.map(item => {
          return <li key ={item}>
            {item}
          </li>
        })
        }
      </ul>
    )
  }
  
  render() {
    //i am setting the parameter characterName equal to the empty array in the state
    const characterName = this.state.names;
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
         <br></br>
         <input type="text" name="characterNameSearch"></input>
         <button type="submit">
            Go!
         </button>
        </form>
        </section>
      <section>
       {this.userResults(characterName)}
      </section>
      </div>
    );
  }
}

export default App;
