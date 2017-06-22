import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import find from 'lodash/find';
import {Input , Spin} from 'antd';

import { fileContent , preRead } from 'actions/visionAction';

class VisionLab extends React.Component {

  componentDidMount(){
      const {fileName , visionId , sha} = this.props.location.query;
      var FoundVision = find(this.props.visionList , ['_id' , visionId]);

      if (FoundVision) {
        this.props.preRead({
            id : visionId,
            commitSha : sha,
            fileName : fileName,
            repoName : FoundVision.title
        })
      }

  }

  render() {
    const {ContentString} = this.props;

    if (!ContentString) return <Spin spinning={true} />

    return (
      <div>
        <Input type="textarea" rows={8} defaultValue={ContentString} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fileContent , preRead} , dispatch)
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      ContentString : state.vision.ContentString
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionLab);
