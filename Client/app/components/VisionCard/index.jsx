import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, Icon, Tag, Avatar, Row, Col, Dropdown, Button } from 'antd';
import VisionMenu from '../DropMenu/VisionCardMenu';

export default class VisionCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onConfirm: PropTypes.func,
    description: PropTypes.string,
    avatar: PropTypes.string,
    updatedAt: PropTypes.string,
    visionId: PropTypes.string,
    likes: PropTypes.number
  }

  static defaultProps = {
    name: 'Unamed',
    description: '',
    updatedAt: 'UnRecorded',
    avatar: '',
    onConfirm: () => {},
    likes: 0,
    visionId: 0
  }

  render() {
    const {
        name,
        description,
        avatar,
        updatedAt,
        likes,
        visionId,
        onConfirm
    } = this.props;
    const cardTitle = (
      <Row type="flex" gutter={16}>
        {
          avatar ? (
            <Col>
              <Avatar
                src={avatar}
              />
            </Col>
          ) : null
        }
        <Col>
          <Row>
            <Icon type="api" />
            <Link to={`/app/vision/${visionId}/content`}>
              <span className="global-left-margin">{name || 'Unamed'}</span>
            </Link>
          </Row>
          <Row>
            <Tag color="#595755">{ updatedAt }</Tag>
          </Row>
        </Col>
      </Row>
    );
    const Menu = VisionMenu(visionId, onConfirm);
    const extra = Menu !== null ? (
      <Dropdown overlay={Menu} placement="bottomCenter">
        <Button type="dashed" icon="bars" shape="circle" />
      </Dropdown>
    ) : null;

    return (
      <div className="global-top-margin">
        <Card
          title={cardTitle}
          noHovering
          className="relative-content"
          extra={extra}
          bordered={false}
          bodyStyle={{ borderBottom: '1px solid #d2eafb' }}
        >
          <div className="vision-desc" >
            {description}
            <div className="card-sub-info">
              <Tag color="#595755">{ updatedAt }</Tag>
              <Tag color="blue"><Icon type="like" /> { likes }</Tag>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
