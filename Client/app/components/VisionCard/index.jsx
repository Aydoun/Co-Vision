import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, Icon, Tag, Avatar, Row, Col, Dropdown, Button } from 'antd';
import VisionMenu from '../DropMenu/VisionCardMenu';
import DiscoverVisionMenu from '../DropMenu/DiscoveryMenu';

const noop = () => {};

export default class VisionCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onConfirm: PropTypes.func,
    onLike: PropTypes.func,
    onClick: PropTypes.func,
    discover: PropTypes.bool,
    description: PropTypes.string,
    avatar: PropTypes.string,
    updatedAt: PropTypes.string,
    visionId: PropTypes.string,
    likes: PropTypes.number
  }

  static defaultProps = {
    name: '--',
    description: '',
    updatedAt: '--',
    avatar: '',
    discover: false,
    onClick: noop,
    onLike: noop,
    onConfirm: noop,
    likes: 0,
    visionId: 0
  }

  render() {
    const {
        name,
        description,
        avatar,
        discover,
        updatedAt,
        likes,
        visionId,
        onConfirm,
        onClick
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
            <Link
              to={!discover ? `/app/vision/${visionId}/content` : null}
            >
              <span className="global-left-margin">{name || 'Unamed'}</span>
            </Link>
          </Row>
          <Row>
            <Tag color="#595755">{ updatedAt }</Tag>
          </Row>
        </Col>
      </Row>
    );
    const Menu = discover ? DiscoverVisionMenu(visionId, onClick) : VisionMenu(visionId, onConfirm);
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
              <Tag
                onClick={() => this.props.onLike(visionId)}
                color="blue"
              >
                <Icon type="like" /> { likes }
              </Tag>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
