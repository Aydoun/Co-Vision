import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form , Button , Input , Card} from 'antd';

const FormItem = Form.Item;

import { prepareSaving } from 'actions/visionAction';

class addVision extends React.Component {
  handleSubmit(e){
      e.preventDefault();
      var visionName = document.getElementById('visionName').value;
      var description = document.getElementById('visonDesc').value;

      if (!(visionName && description)) {
          console.log('Form Not Completely Filled');
          return ;
      }

      var params = {
          repoName : visionName,
          title : visionName,
          description : description
      }

      this.props.prepareSaving(params);
  }

  render() {
    const formItemLayout =  null;
    const buttonItemLayout = null;

    return (
      <Card >
        <Form layout="vertical">
          <FormItem
            label="Vision Name"
          >
            <Input placeholder="Cure For Cancer..." />
          </FormItem>
          <FormItem
            label="Short Introduction"

          >
            <Input type="textarea" rows={8} placeholder="This Vision Would..." />
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary" icon="save">Create</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(addVision);
