import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { prepareListing } from 'actions/visionAction';

class VisionPage extends React.Component {

  componentDidMount(){
      this.props.prepareListing();
  }

  render() {
    const {visionList} = this.props;
    console.log(this.props , 'vision Props');
    return (
      <div>
        <ul>
          {
            visionList.map(function(elem , i){
                return (
                    <li key={i}>
                        <a href="#">{elem.title}</a>
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
  return bindActionCreators({prepareListing} , dispatch)
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList.result.docs,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionPage);
