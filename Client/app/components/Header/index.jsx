import React, { PureComponent } from 'react';
import { Row, Col, Input, Avatar, Badge, Icon, Menu, Dropdown } from 'antd';
import './index.css';

const Search = Input.Search;
const defaultIcon = 'https://tse3.mm.bing.net/th?id=OIP.7z2FjrP37myGiTOad8R9owEsEs&w=212&h=206&c=7&qlt=90&o=4&pid=1.7';

export default class Header extends PureComponent {

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );

    return (
      <div className="header-wrapper">
        <div>
          <Row type="flex">
            <Col span={3}>
              <Search
                placeholder="Search Anything..."
                style={{ width: 200 }}
                onSearch={value => console.log(value)}
              />
            </Col>
          </Row>
        </div>
        <div className="profile-link">
          <Row type="flex" gutter={24}>
            <Col>
            <Dropdown overlay={menu} trigger={['click']}>
              <Badge dot>
                <a href="javascript:void(0)">
                  <Icon style={{ fontSize: 18, marginTop: 4 }} type="notification" />
                </a> 
              </Badge>
            </Dropdown>
            </Col>
            <Col>
              <Avatar src={localStorage.avatar || defaultIcon} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
