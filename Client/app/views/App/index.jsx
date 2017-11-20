import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import { Icon, Tabs } from 'antd';
import AppHeader from 'components/Header';
import Footer from 'components/Footer';
import SideBarContent from 'components/SideBar';
import './index.css';

const TabPane = Tabs.TabPane;

class App extends Component {
    constructor(props){
       super(props);
    }

    render(){
      const { menuContent } = this.props;
      const text = <span>Title</span>;

      return (
        <div >
          <AppHeader />
          <div className="app-top__wrapper">
            <div className="Navigation-Links">
              <Tabs type="card">
              <TabPane key="1" tab={<Link to="/app/vision"><Icon type="home" />Home</Link>} />
              <TabPane key="2" tab={<Link to="/app/discover"><Icon type="share-alt" />Discover</Link>} />
              <TabPane key="31" tab={<Link to="/app/mail"><Icon type="message" />Correspondance</Link>} />
              <TabPane key="4" tab={<Link to="/app/user/profile"><Icon type="user" />Me</Link>} />
            </Tabs>
            </div>
            <div>
              {this.props.children}
            </div>
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
  return {
    menuContent : state.app.menuContent
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
