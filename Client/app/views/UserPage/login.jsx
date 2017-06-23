import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {Icon , Card , Tag , Tabs , Button , Form , Input, Layout , Menu, Breadcrumb } from 'antd';
import SignInForm from './registerForms/signIn';
import SignUpForm from './registerForms/signUp';
import './index.css';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { Header, Content } = Layout;

import { preLogin } from 'actions/userAction';

class loginPage extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          currentTab : '1'
      }
  }

  handleSubmit(){
      console.log('form Submitted');
  }

  login(values){
      console.log(values , 'received values');
      this.props.preLogin(values);
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const {currentTab} = this.state;

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
                  <SignInForm
                    signUpSwitch={() => this.setState({currentTab : "2"})}
                    login={this.login.bind(this)}
                  />
                </Card>
              </TabPane>
              <TabPane tab={<span><Icon type="user-add" />SignUp</span>} key="2">
                <Card>
                  <SignUpForm />
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
  return bindActionCreators({preLogin} , dispatch)
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(loginPage));
