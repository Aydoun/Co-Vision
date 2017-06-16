import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { prepareListing } from 'actions/visionAction';

class VisionPage extends React.Component { 

  componentDidMount(){
      this.props.prepareListing();
  }

  render() {
    return (
      <div>
        <p>Hey Mama</p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({prepareListing} , dispatch)
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.get('visionList'),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionPage);
