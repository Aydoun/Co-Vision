import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

export default (visionId, onClick) => {
  if (visionId) {
    return (
      <Menu onClick={key => onClick(key, visionId)}>
        <Menu.Item key="0">
          <Icon type="fork" />
          <span className="global-left-margin">Join</span>
        </Menu.Item>
        <Menu.Item key="1">
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
