import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import helpers from '../helpers/helpers';
import axios from 'axios';

var styles = {
  borderRadius: '50%'
}

var user = {};

  axios.get('/api/currentuser')
  .then(response => {
      console.log('we have access ot apicurrent user', response);
      user.displayName = `${response.data.firstname} ${response.data.lastname}`;
      user.imgUrl = response.data.phtoUrl;
  })
  .catch(error => {
    console.log(error);
  });



class Navbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    if (this.props.setToggle) {
      this.props.setToggle(this.handleToggle);
    }
    if (this.props.setClose) {
      this.props.setClose(this.handleClose);
    }
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }
  handleClose () {
    this.setState({open: false});
  }

  redirectTo (url) {
    if (!this.isCurrentUrl(url)) {
      window.location.replace(url);
    }
  }

  isCurrentUrl (url) {
    return (window.location.pathname === url);
  }

  render () {
    return (
      <div>
        <AppBar
          title="TrekTracker"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight= {(<div>
            {user.displayName}
            <img src={user.imgUrl}style={styles}/>
            </div>)}
        />
        <Drawer docked={false} width={250} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <MenuItem onClick={this.redirectTo.bind(this, '/')}>Home</MenuItem>
          <MenuItem onClick={this.redirectTo.bind(this, '/profile')}>Profile</MenuItem>
          <MenuItem onClick={this.redirectTo.bind(this, '/logout')}>Logout</MenuItem>
        </Drawer>
        <button> </button>
      </div>
    )
  }
}

export default Navbar;
