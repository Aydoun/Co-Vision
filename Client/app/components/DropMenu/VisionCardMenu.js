import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon, Popconfirm } from 'antd';

export default (visionId, onConfirm) => {
  if (visionId) {
    return (
      <Menu selectable={false}>
          <Menu.Item>
              <Link to={`/vision/${visionId}/content`} >
                  <Icon type="eye-o" />
                  <span className="global-left-margin">View</span>
              </Link>
          </Menu.Item>
          <Menu.Item>
              <Link to={`/vision/${visionId}/history`} >
                  <Icon type="coffee" />
                  <span className="global-left-margin">Contributions</span>
              </Link>
          </Menu.Item>
          <Menu.Item>
              <Link to={`/vision/${visionId}/history`} >
                  <Icon type="team" />
                  <span className="global-left-margin">TimeLine</span>
              </Link>
          </Menu.Item>
          <Menu.Item>
              <Popconfirm placement="bottom" title="Reconfirm Your Choice" onConfirm={onConfirm} okText="Confirm" cancelText="Cancel">
                  <Icon type="logout" />
                  <span className="global-left-margin">Unregister</span>
              </Popconfirm>
          </Menu.Item>
      </Menu>
    );
  }
  return null;
}