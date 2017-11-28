import React, { Component } from 'react';
import { Row, Col, Avatar } from 'antd';
import './index.css';

export default class extends Component {
  render() {
    const { fullName, time, src } = this.props;

    return (
      <div className="msg-nav-wrapper">
        <Row type="flex" gutter={12}>
          <Col>
            <Avatar src={src} size="large" />
          </Col>
          <Col>
            <h3>{fullName}</h3>
            <time>{time}</time>
          </Col>
        </Row>
      </div>
    );
  }
}
