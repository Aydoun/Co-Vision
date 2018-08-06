import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Upload, Button, Icon } from 'antd';
import './index.css';

const FormItem = Form.Item;

class VisionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      avatarUrl: '',
      currentVision: {}
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.saveVisionAction({
          ...values,
          id: this.props.routeParams.id,
        });
      }
    });
  }

  componentDidMount() {
    const { id } = this.props.routeParams;
    const foundVision = this.props.visionList.find(l => l._id === id);
    if (typeof foundVision !== 'undefined') {
      this.setState(() => {
        return {
          currentVision: foundVision,
        };
      });
    }
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
    console.log(this.state.currentVision, 'currentVision');
    const { loading, avatarUrl, currentVision } = this.state;
    const { id } = this.props.routeParams;
    const { getFieldDecorator } = this.props.form;
    const iconType = loading ? 'loading' : 'plus';
    const isAvatar = avatarUrl || currentVision.avatar;

    return (
      <div className="user-profile__form">
        <Upload
          className="avatar-uploader"
          name="file"
          showUploadList={false}
          onChange={this.handleChange}
          action={`${config.apiBase}/vision/${id}/upload?token=${localStorage.token}`}
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
            {getFieldDecorator('title', {
              initialValue: currentVision.title,
            })(
              <Input placeholder="name" />
            )}
          </FormItem>
          <h3>Vision Description:</h3>
          <FormItem >
            {getFieldDecorator('description', {
              initialValue: currentVision.description,
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
  return {
    saveVisionAction : (data) => {
      dispatch({
        type: 'SAVE_VISION_DATA',
        payload: data,
      });
    },
  }
}

function mapStateToProps(state) {
  return {
    visionList: state.vision.visionList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(VisionEdit));
