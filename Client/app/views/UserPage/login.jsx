import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { Button, Form, Grid, Header, Image, Input, Message, Segment } from 'semantic-ui-react';
import { preLogin , preRegister } from 'actions/userAction';

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        this.props.preLogin(values);
      }
    });
  }

  componentWillMount() {
    document.body.classList.add('login')
  }

  componentWillUnmount() {
    document.body.classList.remove('login')
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
          <Form size='large'>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
              <Button color='teal' fluid size='large' onClick={this.handleSubmit.bind(this)}>Login</Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='#'>Sign Up</a>
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
  console.log(state , 'login state');
  return {
    errorObj : state.error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
