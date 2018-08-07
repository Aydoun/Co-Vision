import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Icon, Tag, Avatar, Dropdown, Button, List } from 'antd';
import VisionMenu from '../DropMenu/VisionCardMenu';
import DiscoverVisionMenu from '../DropMenu/DiscoveryMenu';
import { formatDate } from '../../utils';
import './index.css';

const noop = () => {};

export default class VisionCard extends Component {
  static propTypes = {
    onConfirm: PropTypes.func,
    onLike: PropTypes.func,
    header: PropTypes.node,
    loading: PropTypes.bool,
    listData: PropTypes.array,
    onClick: PropTypes.func,
    discover: PropTypes.bool
  }

  static defaultProps = {
    listData: [],
    discover: false,
    onClick: noop,
    header: null,
    loading: false,
    onLike: noop,
    onConfirm: noop
  }

  getExtraMenu(item) {
    const { discover, onClick, onConfirm } = this.props;
    const Menu = discover ?
    DiscoverVisionMenu(item._id, onClick)
    : VisionMenu(item._id, () => onConfirm(item._id, item.creator),
    item.creator === localStorage.userId);

    return Menu !== null ? (
      <Dropdown overlay={Menu} placement="bottomCenter">
        <Button icon="ellipsis" style={{ background: '#fafafa' }} shape="circle" />
      </Dropdown>
    ) : null;
  }

  render() {
    const {
        listData,
        header,
        onLike,
        discover,
        loading
    } = this.props;

    return (
      <div >
        <List
          itemLayout="vertical"
          size="large"
          header={header}
          loading={loading}
          dataSource={listData}
          renderItem={(item, i) => (
            <List.Item
              key={item.id}
              actions={[<Tag color="#1890ff" onClick={() => onLike(item._id)}>
                <Icon type="like-o" /> {item.likes}
              </Tag>,
                <Tag >
                  <Icon type="clock-circle-o" /> {formatDate(item.updatedAt)}
                </Tag>
                      ]}
              extra={this.getExtraMenu(item)}
            >
              <List.Item.Meta
                title={
                  <div className="vision-title_wrapper">
                    <Avatar style={{ verticalAlign: 'middle' }} src={item.avatar} shape="circle" size={128} />
                    <Link
                      to={discover ? `/app/vision/${item._id}/summary` :
                      `/app/vision/${item._id}/content`}
                    >
                      {`${item.title}`}
                    </Link>
                  </div>     
                }
                
              />
              {item.description}
            </List.Item>
          )}
        />
      </div>
    );
  }
}
