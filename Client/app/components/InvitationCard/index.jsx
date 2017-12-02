import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, Icon, Row, Col, Avatar, Dropdown, Button } from 'antd';
import InivitationMenu from '../DropMenu/InvitationCardMenu';

export default class VisionCard extends Component {
  static propTypes = {
    visionName: PropTypes.string.isRequired,
    onAction: PropTypes.func,
    requesterName: PropTypes.string,
    Motivation: PropTypes.string
  }

  static defaultProps = {
    visionName: '',
    requesterName: '',
    Motivation: '',
    onAction: () => {}
  }

  render() {
    const {
        visionName,
        requesterName,
        Motivation,
        visionId,
        onAction
    } = this.props;

    const cardTitle = (
      <div>
        <Icon type="api" />
        <Link to={null}>
          <span className="global-left-margin">{requesterName}</span>
        </Link>
        <span> Requests To Join</span>
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
        bordered={false}
      >
        <div>
          <Row gutter={12} type="flex">
            <Col >
              <Avatar src="" />
            </Col>
            <Col >
              <p>{ visionName }</p>
              <p>{ Motivation }</p>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}
