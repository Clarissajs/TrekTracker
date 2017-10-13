import React from 'react';
import axios from 'axios';
import { Paper, Card, RaisedButton} from 'material-ui';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import Posts from '../components/Posts.jsx';
import Upload from '../components/Upload.jsx';
import TrailMap from '../components/TrailMap.jsx';
import Weather from '../components/Weather.jsx';

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

    axios.get('/api/currentuser')
    .then((response) => {
      if (response.data) {
        this.setState({currentUser: response.data});
      }
    });
  }

  componentDidMount() {
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
  }


  render() {
    return (
      <Container>
        <Row>
          <Col md="6">
            <Paper className='trail-description'>
              <h2>{this.state.trailName}</h2>
              <hr/>
              <p>{this.state.trailDescription}</p>
            </Paper>
          </Col>
          <Col md="6">
            <Paper>
              <TrailMap
                mapCenter={this.state.mapCenter}
              />
            </Paper>
          </Col>
        </Row>
        <hr/>
          <Weather mapCenter={this.state.mapCenter} trailName={this.state.trailName} />
        <hr/>
        {this.state.currentUser ? <Upload mapCenter={this.state.mapCenter}/> : <Link to='/login'><RaisedButton label="Login to upload photos" primary={true}></RaisedButton></Link>}
        <hr/>
        <Posts posts={this.state.posts}/>
      </Container>
    );
  }
}

export default Trail;
