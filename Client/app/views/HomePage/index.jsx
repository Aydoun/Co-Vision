/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import Input from './Input';
import Button from '../../components/Button';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  submitIt(){
      if (this.props.username && this.props.username.trim().length > 0) {
        this.props.loadRepos();
      } else {
        console.log('fucking time');
        this.props.fuckLoad();
      }
  }

  onChangeUsername(e){
    this.props.changeUsername(e.target.value);
  }

  render() {
    const { loading, error, repos , username , issues } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    console.log(this.props , 'this.props');

    return (
      <div>
        <Input
          id="username"
          type="text"
          placeholder="mxstbr"
          value={this.props.username}
          onChange={this.onChangeUsername.bind(this)}
        />
        <Button
            onClick={this.submitIt.bind(this)}
          >
            Submit
        </Button>
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({changeUsername , loadRepos} , dispatch)
}


function mapStateToProps(state) {
  console.log(state , "state");
  var homeState = state.get('home');
  var globalState = state.get('global');
  return {
      username : homeState.get('username'),
      issues : globalState.get('issues'),
  };
}


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
