import React from 'react';
import { Link } from 'react-router';
import { Icon, Input } from 'antd';

export default function Columns() {
    const _this = this;
    return [
      {
          dataIndex: 'name',
          render(item, row) {
              if (row.type === 'file') {
                return (
                  <Input
                    placeholder="Name"
                    prefix={<Icon type="file-text" style={{ color: '#52c41a' }} />}
                  />
                );
              } else if (row.type === 'folder') {
                return (
                  <Input
                    placeholder="Name"
                    prefix={<Icon type="folder" style={{ color: '#52c41a' }} />}
                  />
                );
              }
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
          render(item, row) {
              const iconType = row.type === 'file' || row.type === 'folder' ?
              'save' : 'edit';
              return (
                <div>
                  <Icon type={iconType} />
                </div>
              );
          }
      }
    ];
}
