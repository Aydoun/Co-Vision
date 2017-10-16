import React from 'react';
import { Link } from 'react-router';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class RegisterForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.registerUser(values);
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
            {getFieldDecorator('fullName', {
              rules: [{ required: true, message: 'Please input your FullName!' }],
            })(
              <Input placeholder="FullName" />
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
            <Button type="primary" htmlType="submit" className="login-form-button">
              SignUp
            </Button>
            Already Have an Account ? <Link to="/login">SignIn!</Link>
          </FormItem>
        </Form>
      </div>

    );
  }
}

export default Form.create()(RegisterForm);
