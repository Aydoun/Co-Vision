import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import AppHeader from 'components/Header';
import Footer from 'components/Footer';
import SideBarContent from 'components/SideBar';

import './index.css';

class App extends Component {
    constructor(props){
       super(props);
    }

    render(){
      const { menuContent } = this.props;
      const text = <span>Title</span>;

      return (
        <div>
          <AppHeader />
          <div className="app-general__wrapper" style={{ padding: '0px 8px 0px 70px' }}>
            {this.props.children}
          </div>
        </div>
      );
    }
}

App.propTypes = {
  children: React.PropTypes.node,
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({} , dispatch)
}

function mapStateToProps(state) {
  console.log(state , 'App State');
  return {
    menuContent : state.app.menuContent
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
