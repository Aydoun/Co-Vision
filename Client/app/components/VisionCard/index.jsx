import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, Icon,Tag, Menu, Dropdown, Button, Popconfirm } from 'antd';

export default class VisionCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    visionId: PropTypes.string.isRequired,
    onConfirm: PropTypes.func,
    description: PropTypes.string,
    updatedAt: PropTypes.string,
    status: PropTypes.string,
    likes: PropTypes.number
  }

  static defaultProps = {
    name: 'Unamed',
    description: '',
    updatedAt: 'UnRecorded',
    status: 'Public',
    onConfirm: () => {},
    likes: 0
  }

  render() {
    const { 
        name, 
        description, 
        status, 
        updatedAt, 
        likes, 
        visionId,
        onConfirm 
    } = this.props;

    const cardTitle = (
        <div>
            <Icon type="api" />
            <Link to="/"><span className="global-left-margin">{name || 'Unamed'}</span></Link>
        </div>
    );
    const menu = (
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
                    <Tag color="#595755">{status}</Tag>
                    <Tag color="#595755">{updatedAt}</Tag>  
                    <Tag color="blue"><Icon type="like" /> {likes}</Tag>    
                </div>
            </div>    
        </Card>
    );
  }
}
