import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Menu, Spin, Layout, Icon } from 'antd';
import './index.css';

const { Content, Footer, Sider } = Layout;

class VisionPage extends PureComponent {
  constructor(props){
      super(props);
  }
  render() {
    const {visionList , listPagination , loading} = this.props;
    return (
      <div>
          <Layout style={{ padding: '24px 0', background:'#fff', marginTop: '-17px' }}>
            <Sider width={200} >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <Menu.Item key="1">
                  <Link to="/app/vision/list">
                    <Icon type="eye-o" />My Visions
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/app/vision/create">
                    <Icon type="plus-circle-o" />Add Vision
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/app/invitation">
                    <Icon type="mail" />Invitation
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/app/feedback">
                    <Icon type="customer-service" />Feedback
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
      </div>
    )
  }
}

export default VisionPage;
