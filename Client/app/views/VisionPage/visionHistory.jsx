import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import find from 'lodash/find';

import { preHistory } from 'actions/visionAction';

class VisionHistory extends React.Component {
  componentDidMount() {
      var _id = this.props.routeParams.id;
      var FoundVision = find(this.props.visionList , ['_id' , _id]);

      if (FoundVision) {
        var params = {
           id : _id,
           repoName : FoundVision.title
        }
        console.log(params , 'params');
        this.props.preHistory(params);
      }
  }

  render() {
    console.log(this.props , 'history props');
    const {historyList} = this.props;
    return (
      <div>
        <ul>
            {
                historyList.map(function(elem , i){
                    return (
                        <li key={i}>
                            {elem.comment}
                        </li>
                    )
                })
            }
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({preHistory} , dispatch)
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      historyList : state.vision.historyList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionHistory);
