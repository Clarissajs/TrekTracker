import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'
import Posts from '../components/Posts.jsx';
import Upload from '../components/Upload.jsx';

class Trail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailId: window.location.href.split('id=')[1],
      trailName: null,
      trailDescription: null,
      posts: [],
      currentUser: null
    };

    axios.get('/api/posts/trails/' + this.state.trailId, {params:{trailId:this.state.trailId}})
    .then((response) => {
      console.log('Res back from get posts/trails', response)
      this.setState({
        posts: response.data,
        trailName: response.data[0].trail.name,
        trailDescription: response.data[0].trail.directions
      });
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
          <h3>{this.state.trailDescription}</h3>
        </Paper>
        {this.state.currentUser ? <Upload/> : <div><Link to='/login'>Login to upload your photos</Link></div>}
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default Trail;