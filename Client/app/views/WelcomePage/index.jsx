import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, Icon } from 'antd';
import WelcomeHeader from 'components/Header/welcomeHeader';
import Login from './registerForms/signIn';
import Register from './registerForms/signUp';
import './index.css';

const TabPane = Tabs.TabPane;

export class WelcomePage extends React.Component {
  render() {
    return (
      <div >
        <WelcomeHeader />
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
    notification: state.notif
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
