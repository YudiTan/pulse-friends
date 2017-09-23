import React from 'react';
import Friend from './friend';


class FriendsList extends React.Component {

  constructor(){
    super();
    this.state = {
      name: '',
      movies: null
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps) {
      this.setState({name: nextProps.name, movies: nextProps.movies.map((m) => <Friend key={m.id} movieName={m.name}/>)});
    }
  }


  render() {

    return (
      <div>
        <p><em>Hello {this.state.name}</em></p>
          {this.state.movies}
      </div>

    );
  }
};

export default FriendsList;
