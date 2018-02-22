import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Radio, DatePicker, Upload, Button, Icon } from 'antd';
const { TextArea } = Input;
import { preUserProfile, saveProfile } from 'actions/user';
import moment from 'moment';
import './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      avatarUrl: ''
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.saveProfile(values);
      }
    });
  }

  componentDidMount() {
    this.props.preUserProfile({});
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
    const options = [
      { label: 'Male', value: 0 },
      { label: 'Female', value: 1 },
      { label: 'Secret', value: -1 },
    ];
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
          <h3>Basic:</h3>
          <FormItem >
            {getFieldDecorator('fullName', {
              initialValue: profile.fullName,
            })(
              <Input placeholder="Full Name" />
            )}
          </FormItem>
          <FormItem
            label="Sexe"
          >
            {getFieldDecorator('sexe', {
              initialValue: profile.sexe,
            })(
              <RadioGroup
                options={options}
              />
            )}
          </FormItem>
          <FormItem >
            {getFieldDecorator('age', {
              initialValue: moment(profile.age),
            })(
              <DatePicker placeholder="choose your birthday" />
            )}

          </FormItem>
          <h3>Contact: </h3>
          <FormItem >
            {getFieldDecorator('email', {
              initialValue: profile.email,
            })(
              <Input placeholder="email" />
            )}
          </FormItem>
          <FormItem >
            {getFieldDecorator('phone', {
              initialValue: profile.phone,
            })(
              <Input placeholder="Phone Number" />
            )}

          </FormItem>
          <h3>Profession: </h3>
          <FormItem >
            {getFieldDecorator('profession', {
              initialValue: profile.profession,
            })(
              <Input placeholder="What do you do?" />
            )}
          </FormItem>
          <h3>What is Up: </h3>
          <FormItem >
            {getFieldDecorator('bio', {
              initialValue: profile.bio,
            })(
              <TextArea />
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
  return bindActionCreators({ preUserProfile, saveProfile }, dispatch);
}

function mapStateToProps(state) {
  return {
    profile: state.user.profile
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserProfile));
