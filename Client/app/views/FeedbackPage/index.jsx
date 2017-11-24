import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import assign from 'lodash/assign';
import { Card, Form, Input, Button, Rate } from 'antd';
import { sendFeedback } from 'actions/feedback';

const FormItem = Form.Item;

class feedBackPage extends Component {

  handleSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const params = assign({}, {
          creator: localStorage.userId
        }, fieldsValue);
        this.props.sendFeedback(params);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'string', required: true, message: 'Required Field' }],
    };

    return (
      <Card noHovering>
        <Form layout="vertical">
          <FormItem
            label="Leave A Feedback"
          >
            {getFieldDecorator('message', config)(
              <Input type="textarea" rows={8} placeholder="What's On Your Mind?" />
            )}
          </FormItem>
          <FormItem
            label="Rate The Service"
          >
            {getFieldDecorator('serviceScore', {
              initialValue: 2.5
            })(
              <Rate allowHalf />
            )}
          </FormItem>
          <FormItem >
            <Button type="primary" icon="save" onClick={this.handleSubmit.bind(this)}>Submit</Button>&nbsp;&nbsp;&nbsp;
          </FormItem>
        </Form>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendFeedback }, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(feedBackPage));
