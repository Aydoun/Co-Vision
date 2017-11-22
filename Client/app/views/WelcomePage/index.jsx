import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Tabs, Icon } from 'antd';
import Login from './registerForms/signIn';
import Register from './registerForms/signUp';
import './index.css';

const { Header } = Layout;
const TabPane = Tabs.TabPane;

export class HomePage extends React.PureComponent {
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Header style={{ width: '100%' }}>
          <div className="logo" />
          <h3 style={{ color:'white' }}>Welcome To Co-Vision , Togetherness!</h3>
        </Header>
        <div className="main">
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span><Icon type="login" />Login</span>} key="1">
              <Login />
            </TabPane>
            <TabPane tab={<span><Icon type="plus-circle-o" />Register</span>} key="2">
              <Register />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
