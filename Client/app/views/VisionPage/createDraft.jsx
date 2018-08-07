import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button, Input, Card } from 'antd';
import { saveBranch } from 'actions/vision';

const FormItem = Form.Item;

class addDraft extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.saveBranch({
          branchName: fieldsValue.branchName,
          id: this.props.visionId
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
      <Card >
        <Form layout="vertical">
          <FormItem
            label="Draft Name"
            colon
          >
            {getFieldDecorator('branchName', config)(
              <Input />
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
  return bindActionCreators({ saveBranch }, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(addDraft));
