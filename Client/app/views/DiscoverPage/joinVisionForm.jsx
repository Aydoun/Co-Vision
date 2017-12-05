import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button, Input, Card, Alert } from 'antd';
import { prepareSaving } from 'actions/vision';
import { sendRequest } from 'actions/courrier';

const FormItem = Form.Item;

class addVision extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.sendRequest({
          vision: this.props.vision,
          requested: this.props.creator,
          ...fieldsValue
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { onCancel } = this.props;
    const config = {};

    return (
      <Card >
        <Form layout="vertical">
          <FormItem
            label="Motivation"
            colon
          >
            {getFieldDecorator('motivation', config)(
              <Input type="textarea" rows={8} placeholder="Express Yourself!..." />
            )}
          </FormItem>
          <FormItem >
            <Button
              type="primary"
              icon="save"
              onClick={this.handleSubmit}
            >
              Create
            </Button>&nbsp;&nbsp;&nbsp;
            <Button icon="close" onClick={onCancel} >Cancel</Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ prepareSaving, sendRequest }, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(addVision));
