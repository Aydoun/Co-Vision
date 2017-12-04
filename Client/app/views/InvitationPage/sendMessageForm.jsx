import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button, Input, Card } from 'antd';
import { preSend } from 'actions/courrier';

const FormItem = Form.Item;

class sendMessage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        // console.log({ ...fieldsValue, requesterId: this.props.requesterId });
        this.props.preSend({
          ...fieldsValue,
          receiver: this.props.requesterId,
          external: true
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { onCancel } = this.props;
    const config = {
      rules: [{ type: 'string', required: true, message: 'Required Field' }],
    };

    return (
      <Card noHovering>
        <Form layout="vertical">
          <FormItem
            label="message"
            colon
          >
            {getFieldDecorator('content', config)(
              <Input type="textarea" rows={8} />
            )}
          </FormItem>
          <FormItem >
            <Button
              type="primary"
              icon="message"
              onClick={this.handleSubmit}
            >
              Send
            </Button>&nbsp;&nbsp;&nbsp;
            <Button icon="close" onClick={onCancel}>Cancel</Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preSend }, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(sendMessage));
