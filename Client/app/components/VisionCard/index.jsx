import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, Icon, Tag, Dropdown, Button } from 'antd';
import VisionMenu from '../DropMenu/VisionCardMenu';

export default class VisionCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onConfirm: PropTypes.func,
    description: PropTypes.string,
    updatedAt: PropTypes.string,
    visionId: PropTypes.string,
    status: PropTypes.string,
    likes: PropTypes.number
  }

  static defaultProps = {
    name: 'Unamed',
    description: '',
    updatedAt: 'UnRecorded',
    status: 'Public',
    onConfirm: () => {},
    likes: 0,
    visionId: 0
  }

  render() {
    const {
        name,
        description,
        status,
        updatedAt,
        likes,
        visionId,
        onConfirm
    } = this.props;
    const cardTitle = (
      <div>
        <Icon type="api" />
        <Link to={`/app/vision/${visionId}/content`}>
          <span className="global-left-margin">{name || 'Unamed'}</span>
        </Link>
      </div>
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
        >
          <div className="vision-desc" >
            <p>
              {description}
            </p>
            <div className="card-sub-info">
              <Tag color="#595755">{ status }</Tag>
              <Tag color="#595755">{ updatedAt }</Tag>
              <Tag color="blue"><Icon type="like" /> { likes }</Tag>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
