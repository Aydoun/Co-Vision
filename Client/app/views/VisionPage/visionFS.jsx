import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import find from 'lodash/find';

import { preContent } from 'actions/visionAction';

class VisionFS extends React.Component {
  componentDidMount() {
      var _id = this.props.routeParams.id;
      var FoundVision = find(this.props.visionList , ['_id' , _id]);

      if (FoundVision) {
        var params = {
           id : _id,
           repoName : FoundVision.title
        }
        this.props.preContent(params);
      }
  }

  render() {
    const {visionFS} = this.props;
    return (
      <div>
        <h3>Vision FS</h3>
        <ul>
            {
              visionFS.map((elem , i) => <p key={i}>{elem.name}</p>)
            }
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({preContent} , dispatch)
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      visionFS : state.vision.visionFS
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionFS);
