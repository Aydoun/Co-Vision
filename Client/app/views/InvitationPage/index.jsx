import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

class invitationPage extends Component {

  render() {
    var _this = this;

    return (
      <div>
          <p>Welcome Invitation!</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(invitationPage);
