import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, Icon, Row, Col, Avatar, Dropdown, Button } from 'antd';
import InivitationMenu from '../DropMenu/InvitationCardMenu';

export default class VisionCard extends Component {
  static propTypes = {
    visionName: PropTypes.string.isRequired,
    onAction: PropTypes.func,
    invitorName: PropTypes.string,
    Motivation: PropTypes.string
  }

  static defaultProps = {
    visionName: 'Unamed',
    invitorName: '',
    Motivation: '',
    onAction: () => {}
  }

  render() {
    const {
        visionName,
        invitorName,
        Motivation,
        visionId,
        onAction
    } = this.props;

    const cardTitle = (
      <div>
        <Icon type="api" />
        <Link to={`/vision/${visionId}/content`}>
          <span className="global-left-margin">{visionName || 'Unamed'}</span>
        </Link>
        <span> Invitation To Join</span>
      </div>
    );
    const Menu = InivitationMenu(visionId);
    const extra = Menu !== null ? (
      <Dropdown overlay={Menu} placement="bottomCenter">
        <Button type="dashed" icon="bars" shape="circle" />
      </Dropdown>
    ) : null;

    return (
      <Card
        title={cardTitle}
        noHovering
        extra={extra}
      >
        <div>
          <Row>
            <Col span={8}>
              <Avatar src="" />
            </Col>
            <Col span={8}>
              <p>{ invitorName }</p>
              <p>{ Motivation }</p>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}
