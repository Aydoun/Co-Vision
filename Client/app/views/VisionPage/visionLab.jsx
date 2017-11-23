import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import find from 'lodash/find';
import assign from 'lodash/assign';
import { Form, Button, Card, Input, message } from 'antd';
import { fileContent, preRead, preContribution } from 'actions/vision';

const FormItem = Form.Item;

class VisionLab extends React.Component {
  handleSubmit() {
      this.props.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { fileName, visionId } = this.props.location.query;
          const FoundVision = find(this.props.visionList, ['_id', visionId]);

          if (FoundVision) {
            const params = assign({}, fieldsValue, {
                fileName,
                id :  visionId,
                repoName : FoundVision.title,
                author : localStorage.userfullName,
                authorMail : localStorage.userEmail
            });

            this.props.preContribution(params);
          } else {
            message.error('vision Not Found');
          }
      });
  }

  componentDidMount() {
      const { fileName, visionId, sha } = this.props.location.query;
      const FoundVision = find(this.props.visionList, ['_id', visionId]);

      if (FoundVision) {
        this.props.preRead({
            id : visionId,
            commitSha : sha,
            fileName,
            repoName : FoundVision.title
        });
      }
  }

  componentWillReceiveProps(nextProps) {
      if (!nextProps.error.status && this.props.error.errorMessage != nextProps.error.errorMessage) {
          message.error(nextProps.error.errorMessage);
      }
  }

  render() {
      const { ContentString } = this.props;
      const { getFieldDecorator } = this.props.form;
      const { fileName } = this.props.location.query;
      const config = {
        rules: [{ type: 'string', required: true, message: 'Required Field' }],
      };

      return (
        <div>
          <Card >
            <Form layout="vertical">
              <FormItem
                label={`${fileName || ''} Content`}
              >
                {getFieldDecorator('fileContent', assign({}, config, {
                    initialValue : ContentString
                }))(
                  <Input type="textarea" rows={8} />
                )}
              </FormItem>
              <FormItem
                label="Contribution Comment"
              >
                {getFieldDecorator('message', config)(
                  <Input />
                )}
              </FormItem>
              <FormItem >
                <Button type="primary" icon="save" onClick={this.handleSubmit.bind(this)}>Conribute</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      );
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fileContent, preRead, preContribution }, dispatch);
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      ContentString : state.vision.ContentString,
      error : state.error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(VisionLab));
