import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Radio, DatePicker, Upload, Button, Icon } from 'antd';
import { preUserProfile, saveProfile } from 'actions/user';
import moment from 'moment';
import './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserProfile extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.saveProfile(values);
        console.log('Received values of form: ', values);
      }
    });
  }

  componentDidMount() {
    this.props.preUserProfile({});
  }

  render() {
    const { profile } = this.props;
    const { getFieldDecorator } = this.props.form;
    const options = [
      { label: 'Male', value: 0 },
      { label: 'Female', value: 1 },
      { label: 'Secret', value: -1 },
    ];

    return (
      <div className="user-profile__form">
        <Upload
          className="avatar-uploader"
          name="avatar"
          showUploadList={false}
          action="//jsonplaceholder.typicode.com/posts/"
        >
          {
         profile.avatar ?
           <img src={profile.avatar} alt="profile-pic" className="avatar" /> :
           <Icon type="plus" className="avatar-uploader-trigger" />
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
              <Input
                type="textarea"
                rows={8}
                style={{ width: 500 }}
                placeholder="Tell Us About Yourself"
              />
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
