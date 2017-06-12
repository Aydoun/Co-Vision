/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';

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
        this.props.onSubmitForm();
      }
  }

  render() {
    const { loading, error, repos , username } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <div>
        <Input
          id="username"
          type="text"
          placeholder="mxstbr"
          value={this.props.username}
          onChange={this.props.onChangeUsername}
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

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}


function mapStateToProps(state) {
  var homeState = state.get('home');
  return {
      username : homeState.get('username')
  };
}


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
