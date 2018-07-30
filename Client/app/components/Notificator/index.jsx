import React from 'react';
import { notification } from 'antd';

export default class extends React.Component {
  componentDidMount() {
    const { type, message } = this.props.notificationData;
    console.log('Notification Remounted');
    if(message) {
        notification[type]({
            message,
        });
    }
  }

  render() {
    return null;
  }
}
