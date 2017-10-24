import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Row, Col, Avatar, Input } from 'antd';
import './index.css';

const Search = Input.Search;

export default class Header extends PureComponent {

  render() {
    return (
      <div className="header-wrapper">
        <div className="header-right-content">
          <Row type="flex">
            <Col span={6}>
              <Link to="/">
                <Avatar src="http://tse3.mm.bing.net/th?id=OIP.ZotSj2OR21ya9ySgfb9zlgD6D6&w=173&h=168&c=7&qlt=90&o=4&pid=1.7" />
              </Link>
            </Col>  
          </Row>
          <div className="header-right-menu">
              <Search
                  placeholder="Search..."
                  style={{ width: 200 }}
                  onSearch={value => console.log(value)}
              />
              <Link to="/profile">
                <span className="profile-link">Me</span>
              </Link>
          </div>
        </div>   
      </div>
    );
  }
}
