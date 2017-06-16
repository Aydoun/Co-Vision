import React from 'react';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { loading, error, repos , username , issues } = this.props;

    return (
      <div>
        <p>Welcome Home!</p>
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

export default HomePage;

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({changeUsername , loadRepos} , dispatch)
// }
//
//
// function mapStateToProps(state) {
//   var homeState = state.get('home');
//   var globalState = state.get('global');
//   return {
//       username : homeState.get('username'),
//       issues : globalState.get('issues'),
//   };
// }
//
//
// // Wrap the component to inject dispatch and state into it
// export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
