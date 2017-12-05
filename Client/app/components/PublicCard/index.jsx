import React, { Component } from 'react';
import { Card, Icon, Tag, Row, Col } from 'antd';

export default class extends Component {
  render() {
    const { fullName, contact, profession, summary, visionsCardinal, memberSince } = this.props;
    const cardTitle = (
      <div>
        <Icon type="user" />
        <span className="global-left-margin">{fullName || '?'}</span>
      </div>
    );

    return (
      <Card
        title={cardTitle}
        
      >
        <Row type="flex" gutter={24}>
          <Col >
            <img src="http://tse3.mm.bing.net/th?id=OIP.LeSdHRCk208SZXtGBVLCzwEsDh&w=264&h=195&c=7&qlt=90&o=4&pid=1.7" />
          </Col>
          <Col >
            <Row gutter={12}>
              <Col>
                <Tag color="teal">Visions: {visionsCardinal || 0}</Tag>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Tag color="teal">Member Since: {memberSince || 'Yesterday'} </Tag>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <Row>
          <h3>Contact :</h3>
          <Col offset={1}>
            {
                            contact.map((ct, index) => (
                              <p key={ct.type}>
                                <Icon type={ct.type} />
                                <span className="global-left-margin">{ct.value}</span>
                              </p>
                                ))
                        }
          </Col>
        </Row>
        <Row>
          <h3>Profession :</h3>
          <Col offset={1}>
            <span>{profession || '?'}</span>
          </Col>
        </Row>
        <Row>
          <h3>What's Up :</h3>
          <Col offset={1}>
            <span> {summary || '?'}</span>
          </Col>
        </Row>
      </Card>
    );
  }
}
