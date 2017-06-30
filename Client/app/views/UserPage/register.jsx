import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {Icon , Card , Input, Layout , Alert } from 'antd';
import SignInForm from './registerForms/signIn';
import SignUpForm from './registerForms/signUp';
import './index.css';

import { preLogin , preRegister } from 'actions/userAction';

const { Header, Content } = Layout;

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
        <Content style={{ marginTop: 32 }}>
          <div className="login-wrapper">
              <Card title="Welcome To Co-Vision">
                { !errorObj.status ? <div><Alert message={errorObj.errorMessage} type="error" showIcon /><br/></div> : null }
                <SignUpForm
                    registerUser={(values) => this.props.preRegister(values)}
                />
              </Card>
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
