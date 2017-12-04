import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon, Popconfirm } from 'antd';

export default (visionId, onConfirm, isAdmin) => {
  if (visionId) {
    return (
      <Menu selectable={false}>
        <Menu.Item>
          <Link to={`/app/vision/${visionId}/content`} >
            <Icon type="eye-o" />
            <span className="global-left-margin">View</span>
          </Link>
        </Menu.Item>
        {
          isAdmin ? (
            <Menu.Item>
              <Link to={`/app/vision/${visionId}/edit`} >
                <Icon type="edit" />
                <span className="global-left-margin">Edit</span>
              </Link>
            </Menu.Item>
          ) : null
        }
        <Menu.Item>
          <Link to={`/app/vision/${visionId}/history`} >
            <Icon type="team" />
            <span className="global-left-margin">TimeLine</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/app/vision/${visionId}/summary`} >
            <Icon type="coffee" />
            <span className="global-left-margin">Summary</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Popconfirm
            placement="bottom"
            title="Confirm Your Choice"
            onConfirm={onConfirm}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Icon type="logout" />
            <span className="global-left-margin">Leave</span>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
  }
  return null;
};
