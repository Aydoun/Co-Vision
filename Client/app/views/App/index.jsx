import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
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
        <div >
          <AppHeader />   
          <div className="app-top__wrapper">
            <div className="Navigation-Links">
              <Row type="flex">
                <Col span={6} >
                  <Link to="/vision">Activity</Link>
                </Col>
                <Col span={6} >
                  <Link to="/discover">Discover</Link>
                </Col>
                <Col span={6} >
                  <Link to="/mail">Mail</Link>
                </Col>
                <Col span={6} >
                  <Link to="/Me">Me</Link>
                </Col>
            </Row>
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
