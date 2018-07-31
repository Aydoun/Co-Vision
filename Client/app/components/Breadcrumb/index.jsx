import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router';

export default props => {
    const { appBreadCrumb } = props;

    return (
        <div className="breadcrumb-styles">
            <Breadcrumb separator=">">
                <Breadcrumb.Item >
                    <Icon type="home" />&nbsp;
                    <Link to="/app/vision/list" >Home</Link>
                </Breadcrumb.Item>
            {
                appBreadCrumb.map((item, index) => {
                    return (
                        <Breadcrumb.Item 
                            key={index}
                        >
                         <Link to={item.format ? item.format() : item.link} >{item.label}</Link>                          
                        </Breadcrumb.Item>
                    )
                })
            }
            </Breadcrumb>
        </div> 
    );
}
