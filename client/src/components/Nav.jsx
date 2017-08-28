import React from 'react';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import helpers from '../helpers/helpers';
import axios from 'axios';

var styles = {
  borderRadius: '50%',
  height: 50
}
var txtStyle = {
  // fontSize: '100%',
  // lineHeight: 1.6,
  color: 'white',
  textAlign: 'right'
}

class Navbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      user: {
        displayName: '',
        imgUrl: 'https://www.shipperoo.com/images/profile-default.jpg'
      }
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
  componentDidMount() {
    axios.get('/api/currentuser')
    .then(response => {
        this.setState({user: {displayName: response.data.firstname ?  `${response.data.firstname} ${response.data.lastname}` : this.state.user.displayName,
                              imgUrl: response.data.photoUrl || this.state.user.imgUrl}
        });
      })
    .catch(error => {
      console.log(error);
    });
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
            <div style={txtStyle}>  {this.state.user.displayName}
            {console.log(this.state.user.imgUrl)}
              <Avatar
               src={this.state.user.imgUrl}
               size={50}
              />
            </div>
            </div>)}
        />
        <Drawer docked={false} width={250} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <MenuItem onClick={this.redirectTo.bind(this, '/')}>Home</MenuItem>
          <MenuItem onClick={this.redirectTo.bind(this, '/profile')}>Profile</MenuItem>
          <MenuItem onClick={this.redirectTo.bind(this, '/logout')}>Logout</MenuItem>
        </Drawer>
      </div>
    )
  }
}

export default Navbar;
