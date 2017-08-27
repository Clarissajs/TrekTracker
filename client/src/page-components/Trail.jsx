import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'
import Posts from '../components/Posts.jsx';
import Upload from '../components/Upload.jsx';
import TrailMap from '../components/TrailMap.jsx';

class Trail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailId: window.location.href.split('id=')[1],
      trailName: null,
      trailDescription: null,
      posts: [],
      currentUser: null,
      mapCenter: {
       lat: 37.783697,
       lng: -122.408966
      }
    };

    axios.get('/api/posts/trails/' + this.state.trailId, {params:{trailId:this.state.trailId}})
    .then((response) => {
      console.log('Res back from get posts/trails', response.data)
      if (response.data[0].poster) {
        this.setState({
          posts: response.data,
        });
      }
      this.setState({
        trailName: response.data[0].trail.name,
        trailDescription: response.data[0].trail.directions,
        mapCenter: {
          lat: response.data[0].latitude,
          lng: response.data[0].longitude
        }
      })
    });

    axios.get('/api/currentuser')
    .then((response) => {
      if (response.data) {
        this.setState({currentUser: response.data});
      }
    });
  }

  render() {
    return (
      <div>
        <Paper>
          <h1>{this.state.trailName}</h1>
          <div className='trail-left'>
            <h3>{this.state.trailDescription}</h3>
          </div>
          <div className='trail-right'>
            <h3>Testing map</h3>
            <TrailMap
              mapCenter={this.state.mapCenter}
            />
          </div>
        </Paper>

        {this.state.currentUser ? <Upload /> : <div><Link to='/login'>Login to upload your photos</Link></div>}
        <Posts posts={this.state.posts}/>
      </div>
    );
  }
}

export default Trail;

