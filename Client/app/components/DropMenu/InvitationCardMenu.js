import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

export default (visionId) => {
  if (visionId) {
    return (
      <Menu selectable={false}>
          <Menu.Item>
              <Link to={`/app/vision/${visionId}/content`} >
                  <Icon type="eye-o" />
                  <span className="global-left-margin">Accept</span>
              </Link>
          </Menu.Item>
          <Menu.Item>
              <Link to={`/app/vision/${visionId}/history`} >
                  <Icon type="coffee" />
                  <span className="global-left-margin">Details</span>
              </Link>
          </Menu.Item>
          <Menu.Item>
              <Link to={`/app/vision/${visionId}/history`} >
                  <Icon type="team" />
                  <span className="global-left-margin">Reject</span>
              </Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>
            <Icon type="logout" />
            <span className="global-left-margin">Send Message</span>
          </Menu.Item>
      </Menu>
    );
  }
  return null;
}
