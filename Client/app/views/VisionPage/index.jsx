/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';

export default class VisionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubmit(e){
      e.preventDefault();
      console.log('form Submitted');
  }
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
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
