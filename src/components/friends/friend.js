import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';

class Friend extends React.Component {

  render() {
    return (
      <div className="container">
        <Card>
          <CardHeader
            title={this.props.movieName}
            actAsExpander={false}
            showExpandableButton={false}/>
        </Card>
      </div>
    )
  }
}


export default Friend
