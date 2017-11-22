import React from 'react';
import { Link } from 'react-router';
import { Icon } from 'antd';

export default function Columns() {
    const _this = this;
    return [
      {
          dataIndex: 'name',
          render(item, row, index) {
              const iconType = row.isDirectory ? 'folder' : 'file-text';
              const visionId = _this.props.routeParams.id;
              return (
                <div>
                  <Link to={`${'/vision/lab?' + 'visionId='}${visionId}&sha=${row.sha}&fileName=${row.name}`}><Icon type={iconType} /> {item}</Link>
                </div>
              );
          }
      },
      {
          render(item, row, index) {
              return <span>--</span>;
          }
      },
      {
          render(item, row, index) {
              return <span>--</span>;
          }
      }
    ];
}
