import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import find from 'lodash/find';
import {Input , Spin , message} from 'antd';

import { fileContent , preRead } from 'actions/visionAction';

class VisionLab extends React.Component {

  constructor(props){
      super(props);

      this.state = {
          value : null
      }
  }

  componentWillReceiveProps(nextProps) {
      // console.log(this.props.error , 'this');
      // console.log(nextProps.error , 'next');
      if (!nextProps.error.status && this.props.error.errorMessage != nextProps.error.errorMessage) {
          message.error(nextProps.error.errorMessage)
      }

  }

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
    const {value} = this.state;

    return (
      <div>
        <span>{ContentString}</span>
        <Input type="textarea" rows={8} value={value == null ? ContentString : value} onChange={(e) => this.setState({value : e.target.value})} >
            {ContentString}
        </Input>
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
      ContentString : state.vision.ContentString,
      error : state.error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionLab);
