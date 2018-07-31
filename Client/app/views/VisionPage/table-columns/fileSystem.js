import React from 'react';
import { Link } from 'react-router';
import { Icon, Input } from 'antd';

export default function Columns() {
    const _this = this;
    return [
      {
          title: 'Title',
          dataIndex: 'name',
          render(item, row) {
              const iconType = row.isDirectory ? 'folder' : 'file-text';
              const visionId = _this.props.routeParams.id;
              return (
                <div>
                  <Link to={`/app/vision/${visionId}/lab?sha=${row.sha}&fileName=${row.name}`}>
                    <Icon type={iconType} /> {item}
                  </Link>
                </div>
              );
          }
      },
      {
          title: 'Action',
          render(item, row) {
              console.log(row, 'row');
              return (
                <div>
                  { row.isFile && <span><Icon type="edit" />&nbsp;&nbsp;</span>}
                  <Icon type="delete" />
                </div>
              );
          }
      }
    ];
}
