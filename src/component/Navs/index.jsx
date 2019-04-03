import React from 'react';
import { NavLink } from 'react-router-dom';

class Navs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="nav-list-wrapper">
      <NavLink
          to='/profile'
          activeClassName="is-active"
          className="nav-profile"
          key='/profile'
        >
          <span className="icon is-profile"></span>
      </NavLink>      
        <div className="nav-list">
          <NavLink
            to='/chat'
            activeClassName="is-active"
            className="nav-list-item"
            key='/chat'
          >
            <span className="icon is-chat"></span>
          </NavLink>
          <NavLink
            to='/group'
            activeClassName="is-active"
            className="nav-list-item"
            key='/group'
          >
            <span className="icon is-group"></span>
          </NavLink>
          <NavLink
            to='/user'
            activeClassName="is-active"
            className="nav-list-item"
            key='/user'
          >
            <span className="icon is-user"></span>
          </NavLink>
        </div>
      </div>
    )
  }
}

Navs.propTypes = {

};

export default Navs;
