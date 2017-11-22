import React, { PureComponent } from 'react';
import { Row, Col, Input } from 'antd';
import './index.css';

const Search = Input.Search;

export default class Header extends PureComponent {
  render() {
    return (
      <div className="header-wrapper">
        <div className="header-right-content">
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
      </div>
    );
  }
}
