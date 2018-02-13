import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import './index.css';

const { Content } = Layout;

class VisionPage extends PureComponent {
  render() {
    return (
      <div>
        <Layout style={{ padding: '24px 0', background:'#fff', marginTop: '-17px' }}>
          <Content >
            {this.props.children}
          </Content>
        </Layout>
      </div>
    );
  }
}

export default VisionPage;
