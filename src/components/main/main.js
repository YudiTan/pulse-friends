import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FriendsList from '../friends/friendslist';


class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={FriendsList}/>
      </Switch>
    );
  }
}

export default Main;
