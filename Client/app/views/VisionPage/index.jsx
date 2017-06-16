import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { prepareListing } from './actions';

class VisionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount(){
      this.props.prepareListing();
  }

  render() {
    const {visionList} = this.props;
    console.log('Received List' , visionList);
    return (
      <div>
          {
              visionList.result ?
              visionList.result.docs.map((item , index) => <p key={index}>{item.title}</p>) :
              null
          }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({prepareListing} , dispatch)
}

function mapStateToProps(state) {
  console.log(state , "state");
  var visionState = state.get('vision');
  return {
      visionList : visionState.get('visionList'),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionPage);
