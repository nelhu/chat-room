import React from 'react';
import { NavLink } from 'react-router-dom';
import error_icon from '../assets/error.png';

class ErrorBoundary extends React.Component {
  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({
      error
    });
  }

  render() {
    const { error } = this.state;
    const { render } = this.props;

    if (render && typeof render === 'function') {
      render(error);
    }

    if (error) {
      return (
        <div
          style={{
            textAlign: 'center',
            color: '#999',
            background: 'rgb(249, 249, 249)',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <img src={error_icon} alt="error"/>
            <p>
              <span>发生未知错误,</span>
              <NavLink exact to="/">
                <span style={{color: '#ff4455'}}>
                回首页
                </span>
              </NavLink>
            </p>
          </div>
        </div>
      );
    }

    return (this.props.children);
  }
} 

export default ErrorBoundary;