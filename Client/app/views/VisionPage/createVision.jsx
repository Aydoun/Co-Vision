import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { prepareSaving } from './actions';

class addVision extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubmit(e){
      e.preventDefault();
      var visionName = document.getElementById('visionName').value;
      var description = document.getElementById('visonDesc').value;

      if (!(visionName && description)) {
          console.log('Form Not Completely Filled');
          return ;
      }

      var params = {
          repoName : visionName,
          title : visionName,
          description : description
      }

      this.props.prepareSaving(params)
      .then(function(){
          console.log('we have a then!');
      });

      console.log('form Submitted');
  }

  render() {

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

export default connect(mapStateToProps, mapDispatchToProps)(addVision);
