import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import config from '../../config';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      userID: null,
    }
  }

  componentDidMount() {
    //load the required facebook SDK asynchronously
     window.fbAsyncInit = function() {
       window.FB.init({
         appId      : config.facebook,
         cookie     : false,
         xfbml      : false,
         version    : 'v2.10'
       });
       (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
     };
  }

  facebookLogin() {
    window.FB.login(function(response) {
      this.statusChangeCallback(response);
    }.bind(this), { scope: 'email, public_profile, user_friends'});
  }

  facebookLogout() {
    window.FB.logout();
    this.setState({userToken:null, userID:null});
  }

  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      this.setState({userToken: response.authResponse.accessToken, userID: response.authResponse.userID});
      this.fetchDataFacebook();
    } else if (response.status === 'unknown') {
      window.FB.login();
    }
  }

  fetchDataFacebook() {
    window.FB.api('/me', function(user) {
      console.log('Successful login: ' + user);
    });
  }

  render() {
    return (
      <div>
           <AppBar
             title="Pulse Friends"
             style={{backgroundColor: '#0D47A1'}}
             showMenuIconButton={false}>
             {this.state.userToken ?
               <FlatButton
               label="Log out"
               primary={true}
               style={{backgroundColor: 'white', marginTop: '12px'}}
               onClick={ () => this.facebookLogout() }/>
               :
               <FlatButton
               label="Log In"
               primary={true}
               style={{backgroundColor: 'white', marginTop: '12px'}}
               onClick={ () => this.facebookLogin() }/>}

           </AppBar>
    </div>
    );
  }
}

export default Header;
