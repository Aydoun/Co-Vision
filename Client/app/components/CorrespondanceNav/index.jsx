import React, { Component } from 'react';
import { Icon, Avatar, Menu } from 'antd';
import './index.css';

export default class extends Component {
  render() {  
    const  { fullName, time, src } = this.props;

    return (
        <div className="msg-nav-wrapper">
            <div className="msg-facepile-grid" >
                <img src={src} />
            </div>
            <div className="msg-conversation-card__content">
                <h3>{fullName}</h3>
                <time>{time}</time>
            </div>
        </div>
    );
  }
}


