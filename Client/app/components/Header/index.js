import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Row, Col, Input, Avatar } from 'antd';
import './index.css';

const Search = Input.Search;

export default class Header extends PureComponent {
  render() {
    return (
      <div className="header-wrapper">
        <div>
          <Row type="flex">
            <Col span={3}>
              <Search
                placeholder="Search Anything..."
                style={{ width: 200 }}
                onSearch={value => console.log(value)}
              />
            </Col>
          </Row>
        </div>
        <div className="profile-link">
          <Row type="flex" gutter={12}>
            <Col>
              <Avatar src="https://tse3.mm.bing.net/th?id=OIP.7z2FjrP37myGiTOad8R9owEsEs&w=212&h=206&c=7&qlt=90&o=4&pid=1.7" />
            </Col>
            <Col>
              <Link to="/app/user/profile" >
                {localStorage.fullName}
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
