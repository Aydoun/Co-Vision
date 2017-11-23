import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Button, Card } from 'antd';
import { preRegister } from 'actions/user';

const FormItem = Form.Item;

class RegisterForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.preRegister(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="form-register-normal-login">
        <Card>
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
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                icon="plus-circle-o"
              >
                SignUp
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preRegister }, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RegisterForm));
