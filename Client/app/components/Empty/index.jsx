import React, { Component } from 'react';
import './index.css';

export default class Header extends Component {
  render() {
    const { message } = this.props;
    return (
      <div>
        <div className="empty-result__set" />
        <div className="supporting_text">
          <span>
            { message || 'No Message' }
          </span>
        </div>
      </div>
    );
  }
}
