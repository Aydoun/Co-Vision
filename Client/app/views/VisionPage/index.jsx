/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';

export default class VisionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <p>Create Vision Yo</p>
      </div>
    );
  }
}
