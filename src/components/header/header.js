import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }


  render() {
    return (
      <div>
           <AppBar
             title="Pulse Friends"
             style={{backgroundColor: '#0D47A1'}}
             showMenuIconButton={false}>
             <FlatButton
               label="Log In"
               primary={true}
               style={{backgroundColor: 'white', marginTop: '12px'}}/>
           </AppBar>
    </div>
    );
  }
}

export default Header;
