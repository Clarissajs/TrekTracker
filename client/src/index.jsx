import React from 'react';
import axios from 'axios';
import reactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Home from './page-components/Home.jsx';
import Login from './page-components/Login.jsx';
import User from './page-components/User.jsx';
import Trail from './page-components/Trail.jsx';
import { lightBaseTheme, MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import './styles.css';
axios.defaults.headers.common['Authorization'] = 'Client-ID 3ec73e8df33fffc';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.setLoggedIn = this.setLoggedIn.bind(this);
  }
  setLoggedIn() {
    this.setState({isLoggedIn: true});
  }
  render() {
    console.log('app component loggedIn is:', this.state.isLoggedIn);
    return (
      <div className='content-wrap'>
        <div >
          <Nav isLoggedIn={this.state.isLoggedIn} />
          <Switch>
            <Route exact path='/'>
              <Home isLoggedIn={this.state.isLoggedIn}/>
            </Route>
            <Route exact path='/login'>
              <Login/>
            </Route>
            <Route path='/users'>
            <User/>
            </Route>
            <Route exact path='/profile'>
              <User setLoggedIn={this.setLoggedIn} currentUser={true} />
            </Route>
            <Route exact path='/trail'>
              <Trail/>
            </Route>
          </Switch>
        </div>
      </div>
    )
  }
};

reactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <App/>
    </MuiThemeProvider>
  </BrowserRouter>
, document.getElementById('app'));
