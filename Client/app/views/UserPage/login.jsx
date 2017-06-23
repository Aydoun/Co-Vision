import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {Icon , Card , Tabs , Input, Layout , Alert } from 'antd';
import SignInForm from './registerForms/signIn';
import SignUpForm from './registerForms/signUp';
import './index.css';

import { preLogin , preRegister } from 'actions/userAction';

const { Header, Content } = Layout;
const TabPane = Tabs.TabPane;

class loginPage extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          currentTab : '1'
      }
  }

  render() {
    const {currentTab} = this.state;
    const {errorObj} = this.props;

    return (
      <Layout>
        <Header style={{ width: '100%' }}>
          <div className="logo" />
          <h3 style={{color:'white'}}>Welcome To Co-Vision , Togetherness!</h3>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24 }}>
            <Tabs
              onTabClick={(key) => this.setState({currentTab : key})}
              activeKey={currentTab}
              tabPosition="left"
              style={{ height: '100%' }}
            >
              <TabPane tab={<span><Icon type="user" />SignIn</span>} key="1">
                <Card >
                  {
                    !errorObj.status ? <div><Alert message={errorObj.errorMessage} type="error" showIcon /><br/></div> : null
                  }
                  <SignInForm
                    signUpSwitch={() => this.setState({currentTab : "2"})}
                    login={(values) => this.props.preLogin(values)}
                  />
                </Card>
              </TabPane>
              <TabPane tab={<span><Icon type="user-add" />SignUp</span>} key="2">
                <Card>
                  {
                    !errorObj.status ? <div><Alert message={errorObj.errorMessage} type="error" showIcon /><br/></div> : null
                  }
                  <SignUpForm
                      registerUser={(values) => this.props.preRegister(values)}
                  />
                </Card>
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({preLogin , preRegister} , dispatch)
}

function mapStateToProps(state) {
  console.log(state , 'login state');
  return {
    errorObj : state.error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(loginPage);
