import React from 'react';
import { Breadcrumb } from 'antd';

export default class extends React.Component {
  componentDidMount() {
    const { appBreadCrumb } = this.props;

  }

  render() {
    const { appBreadCrumb } = this.props;
    return (
        <div style={{ margin: 8 }}>
            <Breadcrumb separator=">">
            {
                appBreadCrumb.map((item, index) => {
                    return (
                        <Breadcrumb.Item 
                            key={index}
                            href=""
                        >
                            {item}    
                        </Breadcrumb.Item>
                    )
                })
            }
            </Breadcrumb>
        </div> 
    );
  }
}
