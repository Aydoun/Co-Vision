import React, { Component } from 'react';
import { Menu, Icon, Badge } from 'antd';

const badgeStyle = {
    backgroundColor: '#fff', 
    color: '#43b10c', 
    boxShadow: '0 0 0 1px #d9d9d9 inset'
};

export default class SummaryBar extends Component {
  render() {
    const { summaryData } = this.props;

    return (
        <Menu
          mode="horizontal"
        >
        <Menu.Item key="contributions">
          <Icon type="coffee" />Contributions &nbsp;
          <Badge count={summaryData.totalContributions} style={badgeStyle} overflowCount={500} />
        </Menu.Item>
        <Menu.Item key="group">
          <Icon type="usergroup-add" />Contributors &nbsp;
          <Badge count={summaryData.totalContributors} style={badgeStyle} overflowCount={500} />
        </Menu.Item>
        <Menu.Item key="likes">
          <Icon type="like-o" />Likes &nbsp;
          <Badge count={summaryData.likes} style={badgeStyle} overflowCount={500} showZero/>
        </Menu.Item>
      </Menu>
    );
  }
}
