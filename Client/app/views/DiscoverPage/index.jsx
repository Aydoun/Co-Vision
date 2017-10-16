import React , { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


class discoverPage extends Component {
  render() {
    return (
      <div>
          <p>Welcome Discover!</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(discoverPage);
