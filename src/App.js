import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    names: [],
  }
//you have to use one of the three fixes for JSX readability issues. here arrow syntax was used
  userSearch = (event) => {
    event.preventDefault();
    console.log(event.target);
    //i console logged event.target and saw it was targeting the form so i had to put a name="" for my input to set the value to this variable
    const characterName = event.target.characterNameSearch.value;
    //this is allowing the user to search for a character by name
    fetch(`${characterName}`, {
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
      //had to log the data to see what it was returning
      console.log(data);
      //created an empty array for the loop to loop through
      let search = []
      for(let i = 0; i < data.results.length; i++) {
        search.push(data.results[i].name)
      }
      //this.setState is assigned the value of names from the store for what the loop is returning
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
         {/* I had to give my input a name */}
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
