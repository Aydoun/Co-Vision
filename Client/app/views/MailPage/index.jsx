import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class mailPage extends React.Component {
  render() {
    return (
      <div>
        <p>Welcome Mail!</p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(mailPage);
