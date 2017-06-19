import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import find from 'lodash/find';

import { preContribution } from 'actions/visionAction';

class VisionLab extends React.Component {
  handleSubmit(e){
      e.preventDefault();
      var visonContribution = document.getElementById('visonContribution').value;
      var contributionComment = document.getElementById('contributionComment').value;
      if (!(visonContribution && contributionComment)) {
          console.log('Form Not Completely Filled');
          return ;
      }
      var FoundVision = find(this.props.visionList , ['_id' , this.props.routeParams.id]);

      if (FoundVision) {
        var params = {
            repoName : FoundVision.title,
            message : contributionComment,
            fileContent : visonContribution
        }

        this.props.preContribution(params);
        console.log(params , 'form Submitted');
      } else {
          console.log('Searched Object Not Found');
      }
  }

  render() {

    return (
      <form>
        <div className="row">
          <div className="columns">
            <h3>Vision Lab</h3>
            <label >Contribution Comment</label>
            <input className="u-full-width" type="text" id="contributionComment" />
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
  return bindActionCreators({preContribution} , dispatch)
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList.result.docs,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionLab);
