import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import assign from 'lodash/assign';
import { Form, Button, Input, Card, Alert } from 'antd';
import { prepareSaving } from 'actions/vision';

const FormItem = Form.Item;

class addVision extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { authInfo } = this.props;
        const params = assign({}, {
            author : localStorage.fullName,
            authorMail : localStorage.email
        }, fieldsValue);

        this.props.prepareSaving(params);
        // this.props.cb();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, onCancel } = this.props;
    const config = {
      rules: [{ type: 'string', required: true, message: 'Required Field' }],
    };

    return (
      <Card >
        <Form layout="vertical">
          <FormItem
            label="Vision Name"
            colon
          >
            {getFieldDecorator('title', config)(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="Description"
            colon
          >
            {getFieldDecorator('description', config)(
              <Input type="textarea" rows={8} placeholder="Express Yourself!..." />
            )}
          </FormItem>
          <FormItem >
            <Button
              type="primary" loading={loading}
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
  return bindActionCreators({ prepareSaving }, dispatch);
}

function mapStateToProps(state) {
  return {
    loading: state.vision.loading,
    visionId: state.vision.visionId,
    authInfo: state.user.authInfo
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(addVision));
