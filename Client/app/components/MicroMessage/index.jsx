import React, { Component } from 'react';
import { Icon } from 'antd';

export default class extends Component {
  render() {
    const { type, message, time } = this.props;
    return (
      <div className={`message ${type || ''}`}>
        {message}
        <span className="metadata">
          <span className="time"><Icon type="clock-circle-o" />{time || ''}</span>
        </span>
      </div>
    );
  }
}
