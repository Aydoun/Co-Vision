import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

export default (visionId, onClick) => {
  if (visionId) {
    return (
      <Menu onClick={onClick}>
        <Menu.Item key="0">
          <Icon type="check" />
          <span className="global-left-margin">Accept</span>
        </Menu.Item>
        <Menu.Item key="1">
          <Icon type="close" />
          <span className="global-left-margin">Reject</span>
        </Menu.Item >
        <Menu.Divider />
        <Menu.Item key="2">
          <Icon type="message" />
          <span className="global-left-margin">Send Message</span>
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};
