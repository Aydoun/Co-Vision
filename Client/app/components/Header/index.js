import React from 'react';
import { Link } from 'react-router';
import './index.css';
import Input from 'components/Input';
import Button from 'components/Button';
//import Logo from './logo.png';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {

    return (
      <div className="header-wrapper">
        <div className="header-content">
            <Link to="/" className="app-header-logo">
                <img src="http://tse2.mm.bing.net/th?id=OIP.73gq0A_pbB-ZNayGmF-68QEsCN&pid=15.1" />
            </Link>
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link className="button button-primary right" to="/vision-create">New Vision</Link>
        </div>
      </div>
    );
  }
}

export default Header;
