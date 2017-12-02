import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

export default (visionId) => {
  if (visionId) {
    return (
      <Menu selectable={false}>
        <Menu.Item>
          <Link to={null} >
            <Icon type="check" />
            <span className="global-left-margin">Accept</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={null} >
            <Icon type="close" />
            <span className="global-left-margin">Reject</span>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Icon type="message" />
          <span className="global-left-margin">Send Message</span>
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};
