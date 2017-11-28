import React from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';

const FormItem = Form.Item;

class SendMessageForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && values.message && this.props.sendMessage) {
        this.props.sendMessage(values.message);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Row gutter={8}>
          <Col span={20}>
            {getFieldDecorator('message', {
            })(
              <Input
                prefix={<Icon type="message" style={{ fontSize: 13 }} />}
                placeholder="Type a Message"
              />
            )}
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              htmlType="submit"
            >
              Send
            </Button>
          </Col>
        </Row>
        <FormItem />
      </Form>
    );
  }
}

export default Form.create()(SendMessageForm);
