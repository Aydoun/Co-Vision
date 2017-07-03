import React from 'react';
import { Link, browserHistory } from 'react-router';
import {Icon , Button , Menu, Dropdown,Avatar} from 'antd';
import cookie from 'js-cookie';
import './index.css';

class Header extends React.PureComponent {

  onMenuSelectedItem(selectedObj){
      switch(selectedObj.key){
          case '0':
            //User Profile
            break;
          case '1':
            //Simple Logout
            localStorage.clear();
            window.location.href = '/login';
            break;
          default:
            break;
      }
  }

  render() {
    const menu = (
      <Menu onSelect={this.onMenuSelectedItem}>
        <Menu.Item key="0">
          <div className="global-padding">
            <a ref="#">Profile</a>
          </div>

        </Menu.Item>
        <Menu.Item key="1">
          <div className="global-padding">
            <a href="#">Logout</a>
          </div>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="header-wrapper">
        <div className="header-content">
            <Link to="/" className="app-header-logo">
                <img src="http://tse2.mm.bing.net/th?id=OIP.73gq0A_pbB-ZNayGmF-68QEsCN&pid=15.1" />
            </Link>
            <div style={{marginTop:'4px'}} className="right">
              <Dropdown overlay={menu} placement="bottomCenter">
                <div>
                  <Avatar icon="user"/>
                  <span className="header-username__display">{localStorage.userfullName}</span>
                </div>
              </Dropdown>
            </div>
        </div>
      </div>
    );
  }
}

export default Header;
