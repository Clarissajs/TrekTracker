import Forecast from 'react-forecast';
import React from 'react';

class Weather extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      lat: this.props.mapCenter.lat,
      lng: this.props.mapCenter.lng,
      trailName: this.props.trailName
    }
  };

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.setState({
        lat: nextProps.mapCenter.lat,
        lng: nextProps.mapCenter.lng,
        trailName: nextProps.trailName
      })
    }
  }

  render(){
    return (
      <Forecast latitude={37} longitude={-122} name={'the Bat-Trail'} />
    );
  }
};

export default Weather
