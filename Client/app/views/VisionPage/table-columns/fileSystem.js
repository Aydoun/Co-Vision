import React from 'react';
import { Link } from 'react-router';
import { Icon, Input } from 'antd';
import { formatDate } from 'utils';

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
        title: 'Timestamp',
        dataIndex: 'date',
        render(item) {
          return formatDate(item);
        }
      },
      {
        title: 'Type',
        dataIndex: 'isFile',
        render(item) {
          return item ? 'File' : 'Folder';
        }
      },
      {
          title: 'Action',
          render(item, row) {
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
