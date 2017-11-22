import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form , Input , Button, Radio, DatePicker, Upload } from 'antd';
import './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: 'http://tse3.mm.bing.net/th?id=OIP.LeSdHRCk208SZXtGBVLCzwEsDh&w=264&h=195&c=7&qlt=90&o=4&pid=1.7'
    }
  }
  render() {
    const { imageUrl } = this.state;
    const plainOptions = ['Male', 'Female', 'Secret'];

    return (
      <div className="user-profile__form">
        <Upload
          className="avatar-uploader"
          name="avatar"
          showUploadList={false}
          action="//jsonplaceholder.typicode.com/posts/"
        >
        {
         imageUrl ?
           <img src={imageUrl} alt="" className="avatar" /> :
           <Icon type="plus" className="avatar-uploader-trigger" />
       }
        </Upload>
        <Form layout="inline">
          <h3>Basic:</h3>
          <FormItem
          >
            <Input placeholder="Full Name" />
          </FormItem>
          <FormItem
            label="Sexe"
          >
            <RadioGroup
              options={plainOptions}
              value={'Male'}
            />
          </FormItem>
          <FormItem
          >
            <DatePicker placeholder="choose your birthday"/>
          </FormItem>
          <h3>Contact: </h3>
            <FormItem
            >
              <Input placeholder="email" />
            </FormItem>
            <FormItem
            >
              <Input placeholder="Phone Number" />
            </FormItem>
          <h3>Profession: </h3>
            <FormItem
            >
              <Input placeholder="What do you do?" />
            </FormItem>
          <h3>What's Up: </h3>
            <FormItem
            >
              <Input type="textarea"
                rows={8}
                style={{ width: 500 }}
                placeholder="Tell Us About Yourself"
              />
            </FormItem>
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({} , dispatch)
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
