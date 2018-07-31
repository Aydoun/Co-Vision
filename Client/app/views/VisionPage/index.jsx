import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import './index.css';

const { Content } = Layout;

class VisionPage extends PureComponent {
  render() {
    return (
      <div>
        <Layout style={{ background:'#fff' }}>
          <Content >
            {this.props.children}
          </Content>
        </Layout>
      </div>
    );
  }
}

export default VisionPage;
