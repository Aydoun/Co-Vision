import React from 'react';
import { Link } from 'react-router';
import {Icon , Button , Menu, Dropdown} from 'antd';
import './index.css';

class Header extends React.PureComponent {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a ref="#">Profile</a>
        </Menu.Item>
        <Menu.Item>
          <a href="#">Logout</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="header-wrapper">
        <div className="header-content">
            <Link to="/" className="app-header-logo">
                <img src="http://tse2.mm.bing.net/th?id=OIP.73gq0A_pbB-ZNayGmF-68QEsCN&pid=15.1" />
            </Link>
            <div className="right">
              <Link to="/vision/create"><Button type="primary" icon="plus" >New Vision</Button></Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown overlay={menu} placement="bottomCenter">
                <Icon type="user" />
              </Dropdown>
            </div>
        </div>
      </div>
    );
  }
}

export default Header;
