import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { prepareSaving } from './actions';

class VisionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubmit(e){
      e.preventDefault();

      var params = {
          repoName : 'testify',
          title : 'testify',
          description : 'Nari Nari'
      }

      this.props.prepareSaving(params);

      console.log('form Submitted');
  }

  render() {
    console.log(this.props.visionId , "Vision Id");

    return (
      <form>
        <div className="row">
          <div className="columns">
            <label >Vision Name</label>
            <input className="u-full-width" type="text" placeholder="Change The World!" id="visionName" />
          </div>
        </div>
        <label >Description</label>
        <textarea className="u-full-width" placeholder="" id="visonDesc"></textarea>
        <input className="button-primary" type="submit" value="Submit" onClick={this.handleSubmit.bind(this)}/>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({prepareSaving} , dispatch)
}

function mapStateToProps(state) {
  console.log(state , "state");
  var visionState = state.get('vision');
  return {
      visionId : visionState.get('visionId'),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionPage);
