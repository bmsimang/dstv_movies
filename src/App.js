import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import {apiEndpoint} from './config/links';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: {},
      orderBy: '',
      orderSelect: {}
    }
  }

  render() {
    const {movies} = this.state;
    let moviesList;

    if (movies.items) {
      moviesList = movies.items.map((item, index) => {
        return (
        <div className="poster" key={index}>
          <img src={item.imageUrl} alt={item.title}/>
          <div className="read-more">
            <button onClick={()=>{this.showDetails(item)}}>Read More</button>
          </div>
        </div>
        )
      })
    }

    return (
      <div className="app">
        {moviesList}
      </div>
    );
  }

  componentDidMount() {
    axios.get(apiEndpoint).then(res => {
      return res.data;
    }).then(data => {
      this.setState({
        movies: data.components[1],
        orderSelect: data.components[0]
      })
      
    }).catch(err => {
      swal('Error', 'Failed to retrieve movies!', 'error');
    })
  }

  showDetails(item) {
    swal(
      <div>
        <h3>{item.title}</h3>
        <h4>Release Date - {item.releaseDate}</h4>
        <p>{item.synopsis}</p>
        <hr/>
        <p>Rank - {item.rank}</p>
      </div>
    )
    
  }
}

export default App;
