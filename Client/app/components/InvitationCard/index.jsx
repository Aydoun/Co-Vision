import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, Icon, Row, Col, Avatar, Dropdown, Button } from 'antd';
import InivitationMenu from '../DropMenu/InvitationCardMenu';

export default class VisionCard extends Component {
  static propTypes = {
    visionName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    visionId: PropTypes.string,
    requesterId: PropTypes.string,
    visionAvatar: PropTypes.string,
    requesterName: PropTypes.string,
    Motivation: PropTypes.string
  }

  static defaultProps = {
    visionName: '',
    requesterName: '',
    Motivation: '',
    visionAvatar: '',
    visionId: '0',
    requesterId: '0',
    onClick: () => {}
  }

  render() {
    const {
        visionName,
        requesterName,
        Motivation,
        visionId,
        requesterId,
        visionAvatar,
        onClick
    } = this.props;

    const cardTitle = (
      <div>
        <Icon type="user" />
        <Link to={null}>
          <span className="global-left-margin">{requesterName}</span>
        </Link>
        <span> Requests To Join</span>
      </div>
    );
    const Menu = InivitationMenu(visionId, obj => onClick(obj, requesterId, visionId));
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
              <Avatar src={visionAvatar} />
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
