import React from 'react';
import { Link } from 'react-router';
import {Button} from 'antd';
import './index.css';

class Header extends React.Component {
  render() {

    return (
      <div className="header-wrapper">
        <div className="header-content">
            <Link to="/" className="app-header-logo">
                <img src="http://tse2.mm.bing.net/th?id=OIP.73gq0A_pbB-ZNayGmF-68QEsCN&pid=15.1" />
            </Link>
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link className="right" to="/vision/create"><Button icon="plus" >New Vision</Button></Link>
        </div>
      </div>
    );
  }
}

export default Header;
