import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon , Button} from 'antd';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { loading, error, repos , username , issues } = this.props;

    return (
      <div>
        <Button icon="save">Welcome Home!</Button>
        
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
