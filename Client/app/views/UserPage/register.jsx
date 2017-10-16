import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import { Layout } from 'antd';

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
        <p>Register</p>
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
