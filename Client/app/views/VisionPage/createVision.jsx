import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import assign from 'lodash/assign';
import { Form, Button, Input, Card, Alert } from 'antd';
import { prepareSaving } from 'actions/vision';

const FormItem = Form.Item;

class addVision extends React.Component {
  getMessage() {
    const { error, visionId } = this.props;
    if (visionId && !error) {
      return (
        <div>
          <Alert
            message={(
              <span>Vision Successfully Created
                <Link to="/app/vision/list"> details </Link>
              </span>
            )} type="success" closable showIcon
          /><br />
        </div>
      );
    } else if (error) {
      return (
        <div>
          <Alert message={`${error}`} type="error" closable showIcon /><br />
        </div>
      );
    }
    return null;
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
    const { loading, error, onCancel } = this.props;
    const config = {
      rules: [{ type: 'string', required: true, message: 'Required Field' }],
    };
    // const message = this.getMessage();

    return (
      <Card noHovering>
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
            label="Motivation"
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
              onClick={this.handleSubmit.bind(this)}
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
    authInfo: state.user.authInfo,
    error: state.vision.error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(addVision));
