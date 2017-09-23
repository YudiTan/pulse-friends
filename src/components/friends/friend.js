import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';

class Friend extends React.Component {

  render() {
    return (
        <Card>
          <CardHeader
            title={this.props.movieName}
            actAsExpander={false}
            showExpandableButton={false}/>
        </Card>
    )
  }
}


export default Friend
