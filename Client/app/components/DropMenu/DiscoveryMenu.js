import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

export default (visionId) => {
  if (visionId) {
    return (
      <Menu selectable={false}>
        <Menu.Item>
          <Icon type="fork" />
          <span className="global-left-margin">Join</span>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/app/vision/${visionId}/summary`} >
            <Icon type="coffee" />
            <span className="global-left-margin">Summary</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};
