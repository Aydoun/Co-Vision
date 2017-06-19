import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { prepareSaving } from 'actions/visionAction';

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

      this.props.prepareSaving(params);
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
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(addVision);
