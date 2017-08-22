import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import { Button, Form, Grid, Header, Image, Input, Message, Segment } from 'semantic-ui-react';
import { preLogin , preRegister } from 'actions/userAction';
import LoginForm from './registerForms/signIn';

class LoginContainer extends Component {
  handleSubmit(values){
      this.props.preLogin(values);
  }
  render() {
    return (
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyqeUqOsSwko7RqfWmg2O73ryxYzuUxwkyHDzrQbaqZ-Q9zBoM' />
            {' '}SignIn
          </Header>
          <LoginForm handleSubmit={this.handleSubmit.bind(this)}/>
          <Message>
            New to us? <Link to="/register">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
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
