import React from 'react';
import { NavLink } from 'react-router-dom';

class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    const { content } = this.props;
    return (
      <div className="head">
        <div className="head-content">{content}</div>
        <div className="head-actions">
          {this.props.children}
        </div>
        
      </div>
    )
  }
}

Head.propTypes = {

};

export default Head;
