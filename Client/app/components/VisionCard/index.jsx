import React, { Component } from 'react';
import { Link } from 'react-router';
import { Card, Icon,Tag, Menu, Dropdown, Button, Popconfirm } from 'antd';

export default class VisionCard extends Component {
  render() {
    const { name, description, status, creationData } = this.props;
    const cardTitle = (
        <div>
            <Icon type="api" />
            <Link to="/"><span className="global-left-margin">{name || 'Unamed'}</span></Link>
        </div>
    );
    const menu = (
    <Menu selectable={false}>
        <Menu.Item>
            <span>My Vision Role</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
            <Link to="/" >
                <Icon type="eye-o" />
                <span className="global-left-margin">View</span>
            </Link>
        </Menu.Item>   
        <Menu.Item>
            <Link to="/" >
                <Icon type="coffee" />
                <span className="global-left-margin">Contributions</span>
            </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/" >
                <Icon type="team" />
                <span className="global-left-margin">TimeLine</span>
            </Link>
        </Menu.Item>
        <Menu.Item>
            <Popconfirm placement="bottom" title="Reconfirm Your Choice" okText="Confirm" cancelText="Cancel">
                <Icon type="logout" />
                <span className="global-left-margin">Unregister</span>
            </Popconfirm>
        </Menu.Item>
    </Menu>
    );

    return (
        <Card
            title={cardTitle}
            noHovering
            className="relative-content"
            extra={
                <Dropdown overlay={menu} placement="bottomCenter">
                    <Button type="dashed" icon="down-circle-o" shape="circle"/>
                </Dropdown>
            }
        >
            <div className="vision-desc" >
                <p>
                    {description}
                </p>
                <div className="card-sub-info">
                    <Tag color="teal">{status || 'No Status'}</Tag>
                    <Tag color="teal">{creationData || 'Today'}</Tag>    
                </div>
            </div>    
        </Card>
    );
  }
}
