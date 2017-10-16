import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import { preLogin , preRegister } from 'actions/userAction';

class LoginContainer extends Component {
  handleSubmit(values){
      this.props.preLogin(values);
  }
  render() {
    return (
      <p>Hey</p>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({preLogin , preRegister} , dispatch)
}

function mapStateToProps(state) {
  //console.log(state , 'login state');
  return {
    errorObj : state.error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
