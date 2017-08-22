import React, { PureComponent } from 'react';
import { Link, browserHistory } from 'react-router';
import { Input } from 'semantic-ui-react';
import {Icon , Menu, Dropdown,Avatar} from 'antd';
import './index.css';

class Header extends PureComponent {

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
            <Link to="/user/profile">Profile</Link>
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
            <Input icon='search' placeholder='Search...' />
            <div className="right">
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
