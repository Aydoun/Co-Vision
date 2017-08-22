import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="form-register-normal-login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button primary >
              Login
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginForm);
