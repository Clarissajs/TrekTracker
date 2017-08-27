import React, {Component} from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { onDragEnd, handleMapMounted } from '../helpers/helpers.js';


class TrailMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('PROPS in Trailmap', this.props)
    return (
      <GettingStartedGoogleMap
        containerElement={
          <div style={{height: '300px', width: '300px'}} />
        }
        mapElement={
          <div style={{height: '300px', width: '300px'}} />
        }
        mapCenter={this.props.mapCenter}
      />
    )
  }
}

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    onClick={props.onMapClick}
    center={props.mapCenter}
  >
    <Marker
      position={props.mapCenter}
    />
  </GoogleMap>
));


export default TrailMap;


