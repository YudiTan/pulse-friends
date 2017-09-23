import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import config from '../../config';
import FriendsList from '../friends/friendslist';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      userID: null,
      movies: null,
      userName: null
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
    }.bind(this), { scope: 'email, public_profile, user_friends, user_likes'});
  }

  facebookLogout() {
    window.FB.logout();
    this.setState({
      userToken: null,
      userID: null,
      movies: null,
      userName: null
    });
  }

  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      this.setState({
        userToken: response.authResponse.accessToken,
        userID: response.authResponse.userID,
        movies: this.state.movies,
        userName: this.state.userName});
      // getting the user's full name
      window.FB.api('/me', user => {
        this.setState({
          userToken: this.state.userToken,
          userID:this.state.userID,
          movies:this.state.movies,
          userName: user.name});
      });
      // getting the list of user's liked movies
      window.FB.api(`/${this.state.userID}/movies`, movie => {
        this.setState({
          userToken: this.state.userToken,
          userID:this.state.userID,
          movies:movie.data,
          userName:this.state.userName});
      })
    } else if (response.status === 'unknown') {
      window.FB.login();
    }
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
           {this.state.userToken ? <FriendsList name={this.state.userName} movies={this.state.movies}/> : <h3> Please login to proceed. </h3>}
    </div>
    );
  }
}

export default Main;
