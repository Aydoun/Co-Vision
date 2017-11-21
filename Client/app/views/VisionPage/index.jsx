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
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
      </div>
    )
  }
}

export default VisionPage;
