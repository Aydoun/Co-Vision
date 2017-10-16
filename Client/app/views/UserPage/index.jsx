import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {Card , Tag , Button , Pagination , Spin} from 'antd';

//import { prepareListing } from 'actions/visionAction';

class loginPage extends React.Component {

  render() {
    var _this = this;

    return (
      <div>
          <p>Welcome User!</p>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({} , dispatch)
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(loginPage);
