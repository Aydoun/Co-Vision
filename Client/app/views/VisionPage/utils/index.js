import React from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown, Icon } from 'antd';

export function getVisionCardExtra(key) {
  const _this = this;

  const menu = (
    <Menu onSelect={() => _this.onMenuSelectedItem.bind(_this)(key)}>
      <Menu.Item key="0">
        <div className="global-padding">
          <Link to={`/vision/${key}/history`}> <Icon type="clock-circle-o" /> TimeLine </Link>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <div className="global-padding">
          <Link to={`/vision/${key}/content`}> <Icon type="folder" /> Content </Link>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
      <a className="ant-dropdown-link" href="#">
        <Icon type="down" />
      </a>
    </Dropdown>
  );
}
