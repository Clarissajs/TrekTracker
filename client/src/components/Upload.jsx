import React from 'react';
import { updateImage, submitImage } from '../helpers/helpers.js';
import gps from '../helpers/gps.js';
import { Paper, RaisedButton } from 'material-ui';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      trailId: window.location.href.split('id=')[1],
      lat: this.props.mapCenter.lat,
      lng: this.props.mapCenter.lng
    }
    this.submitImage = submitImage.bind(this);
    this.updateImage = updateImage.bind(this);
  }

  // componentWillMount() {
  //   gps.getLocation()
  //   .then(value => {
  //     this.setState({lat: value.coords.latitude, lng: value.coords.longitude})
  //   })
  //   .catch(err => console.log('location access denied: ', err));
  // }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      this.setState({
        lat: nextProps.mapCenter.lat,
        lng: nextProps.mapCenter.lng
      })
    }
  }

  componentDidMount() {
    this.input = document.querySelector('.input');
    this.preview = document.querySelector('.preview');
  }

  render() {
    console.log('[UPLOAD] this.props.toggleUpdatePosts is', this.props.toggleUpdatePosts);
    return(
      <Paper className='view-upload'>
        <form onSubmit={ this.submitImage }>
          <h2>Upload trek pic!</h2>
          <input className='input' onChange={(e) => this.updateImage(e)} type='file' accept='image/*' capture='camera' />
          <button style={{position:'relative',left:'10px',backgroundColor:'papayawhip'}}>Submit</button>
        </form>
        <div className='preview'>
          <p>No files currently selected for upload</p>
        </div>
      </Paper>
    );
  }
};


export default Upload;
