import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Upload, Button, Icon } from 'antd';
import { testAction } from 'actions/vision';
import './index.css';

const FormItem = Form.Item;

class VisionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      avatarUrl: ''
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     this.props.saveProfile(values);
    //   }
    // });
    // this.props.testAction();
  }

  componentDidMount() {
    // this.props.preUserProfile({});
  }

  handleChange = (info) => {
    const { status, response } = info.file;
    if (status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (status === 'done') {
      this.setState({
        avatarUrl: response.response.url,
        loading: false
      });
    }
  }

  render() {
    const { loading, avatarUrl } = this.state;
    const { profile } = this.props;
    const { getFieldDecorator } = this.props.form;
    const iconType = loading ? 'loading' : 'plus';
    const isAvatar = avatarUrl || profile.avatar;

    return (
      <div className="user-profile__form">
        <Upload
          className="avatar-uploader"
          name="file"
          showUploadList={false}
          onChange={this.handleChange}
          action={`${config.apiBase}/user/upload?token=${localStorage.token}`}
        >
          {
         isAvatar && !loading ?
           <img src={isAvatar} alt="profile-pic" className="avatar" /> :
           <Icon type={iconType} className="avatar-uploader-trigger" />
       }
        </Upload>
        <Form layout="inline">
          <h3>Vision Name:</h3>
          <FormItem >
            {getFieldDecorator('fullName', {
              initialValue: profile.fullName,
            })(
              <Input placeholder="name" />
            )}
          </FormItem>
          <h3>Vision Description:</h3>
          <FormItem >
            {getFieldDecorator('fullName', {
              initialValue: profile.fullName,
            })(
              <Input placeholder="description" />
            )}
          </FormItem>
          <h3 />
          <FormItem >
            <Button
              icon="save"
              type="primary"
              onClick={this.handleSubmit}
              htmlType="submit"
            >
              Save
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ testAction }, dispatch);
}

function mapStateToProps(state) {
  return {
    profile: state.user.profile
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(VisionEdit));
