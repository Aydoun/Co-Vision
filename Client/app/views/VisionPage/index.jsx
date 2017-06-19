import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

import { prepareListing } from 'actions/visionAction';

class VisionPage extends React.Component {

  componentDidMount(){
      this.props.prepareListing();
  }

  render() {
    const {visionList} = this.props;
    return (
      <div>
        <ul>
          {
            visionList.map(function(elem , i){
                return elem._id ? (
                    <li key={i}>
                        <Link to={"/vision/" + elem._id + "/content"}>{elem.title}</Link>&nbsp;&nbsp;&nbsp;
                        <Link to={"/vision/"+ elem._id + "/history"}>TimeLine</Link>
                    </li>
                ) : (
                    <li key={i}>
                        <Link to={"/vision"}>{elem.title}</Link>&nbsp;&nbsp;&nbsp;
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
      visionList : state.vision.visionList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionPage);
