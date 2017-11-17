import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import {Form , Button , Input , Card} from 'antd';

const FormItem = Form.Item;

import { prepareSaving } from 'actions/visionAction';
import {getAllCookies} from 'utils';

class addVision extends React.Component {

  handleSubmit(){
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        var params = Object.assign({} , {
            repoName : fieldsValue.title,
            author : localStorage.fullName || 'Amino',
            authorMail : localStorage.userEmail,
            creator : localStorage.userId
        } , fieldsValue);

        this.props.prepareSaving(params);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'string', required: true, message: 'Required Field' }],
    };

    return (
      <Card >
        <Form layout="vertical">
          <FormItem
            label="Vision Name"
          >
            {getFieldDecorator('title', config)(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="Motivation"
          >
            {getFieldDecorator('description', config)(
              <Input type="textarea" rows={8} placeholder="Express Yourself!..." />
            )}
          </FormItem>
          <FormItem >
            <Button type="primary" icon="save" onClick={this.handleSubmit.bind(this)}>Create</Button>&nbsp;&nbsp;&nbsp;
            <Button icon="close" ><Link to="/vision/list">Cancel</Link></Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({prepareSaving} , dispatch)
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(addVision));
