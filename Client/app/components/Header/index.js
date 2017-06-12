import React from 'react';
import { Link } from 'react-router';
import './index.css';
//import Logo from './logo.png';


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header-wrapper">
        <div className="header-content">
            <a className="app-header-logo" href="#">
                <img src="http://tse2.mm.bing.net/th?id=OIP.73gq0A_pbB-ZNayGmF-68QEsCN&pid=15.1" />
            </a>
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
        </div>
      </div>
    );
  }
}

export default Header;
