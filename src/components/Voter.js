import React from 'react';
import { Button } from 'react-bootstrap';

class Voter extends React.Component {
    state = {
      updisable: false,
      downdisable: false
    }


    handleUpdate = (choice) => {
        
      this.props.voteChangeOnArticle.call(null, this.props.articleId, choice);
      this.setState({
        [`${choice}disable`]: true
      });
    }
    render() {
      return (
        <div>
          <Button onClick={this.handleUpdate.bind(null, 'up')} disabled={this.state.updisable}><i className="fas fa-thumbs-up"></i></Button>
          <span className="voteCount">{this.props.votes} votes</span>
          <Button onClick={this.handleUpdate.bind(null, 'down')} disabled={this.state.downdisable}><i className="fas fa-thumbs-down"></i></Button>
        </div>
      );
    }
}

export default Voter;