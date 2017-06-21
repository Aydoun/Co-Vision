import React from 'react';
import {Icon} from 'antd'

export default function Columns(){
    return [
      {
          dataIndex: 'name',
          render(item , row , index){
              var iconType = row.isDirectory ? 'folder' : 'file-text';

              return (
                  <div>
                    <a href="#"><Icon type={iconType} /> {item}</a>
                  </div>
              )
          }
      },
      {
          render(item , row , index){
              return <span>--</span>
          }
      },
      {
          render(item , row , index){
              return <span>--</span>
          }
      }
    ]
}
