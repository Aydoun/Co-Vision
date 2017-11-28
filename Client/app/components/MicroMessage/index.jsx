import React from 'react';
import { Icon } from 'antd';

// export default props => (
//   <div className={`message ${props.type || ''}`}>
//     {props.message}
//     <span className="metadata">
//       <span className="time"><Icon type="clock-circle-o" />{props.time || ''}</span>
//     </span>
//   </div>
//   );

export default class extends React.Component {
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
