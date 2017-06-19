import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { prepareSaving } from 'actions/visionAction';

class addVision extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubmit(e){
      e.preventDefault();
      var visonContribution = document.getElementById('visonContribution').value;

      if (!visonContribution) {
          console.log('Form Not Completely Filled');
          return ;
      }

      // var params = {
      //     repoName : visionName,
      //     title : visionName,
      //     description : description
      // }
      //
      // this.props.prepareSaving(params);
      console.log('form Submitted');
  }

  render() {

    return (
      <form>
        <div className="row">
          <div className="columns">
            <h3>Vision Lab</h3>
          </div>
        </div>
        <label >Contribution</label>
        <textarea className="u-full-width" placeholder="" id="visonContribution"></textarea>
        <input className="button-primary" type="submit" value="Contribute" onClick={this.handleSubmit.bind(this)}/>
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
