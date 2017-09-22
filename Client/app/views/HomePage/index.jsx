import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button } from 'semantic-ui-react';

export class HomePage extends React.PureComponent {

  render() {
    return (
      <div>
        <h2>Home 2</h2>
      </div>
    );
  }
}

// HomePage.propTypes = {
//   loading: React.PropTypes.bool,
//   error: React.PropTypes.oneOfType([
//     React.PropTypes.object,
//     React.PropTypes.bool,
//   ]),
//   repos: React.PropTypes.oneOfType([
//     React.PropTypes.array,
//     React.PropTypes.bool,
//   ]),
//   onSubmitForm: React.PropTypes.func,
//   username: React.PropTypes.string,
// };

// export default HomePage;

function mapDispatchToProps(dispatch){
  return bindActionCreators({} , dispatch)
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
