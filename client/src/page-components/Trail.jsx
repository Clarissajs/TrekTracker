import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Posts from '../components/Posts.jsx';
import Upload from '../components/Upload.jsx';

class Trail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailId: window.location.href.split('id=')[1],
      trailName: null,
      posts: [],
      currentUser: null
    };

    axios.get('/api/posts/trails/' + this.state.trailId, {params:{trailId:this.state.trailId}})
    .then((response) => {
      this.setState({
        posts: response.data
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
          <h1>Trail Name</h1>
        </Paper>
        {this.state.currentUser ? <Upload/> : <div><Link to='/login'>Login to upload your photos</Link></div>}
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default Trail;