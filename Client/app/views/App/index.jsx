import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {BackTop, Layout, Icon} from 'antd';

const { Content, Sider } = Layout;

import Header from 'components/Header';
import Footer from 'components/Footer';
import SideBarContent from 'components/SideBar';

import './index.css';

class App extends React.Component {
    constructor(props){
       super(props);
    }

    render(){
        return (
        <Layout>
          <BackTop />
          <Header />
          <Layout >
            <Sider width={200} style={{ background: '#fff' }}>
                <SideBarContent />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content style={{position : 'relative', background:'#fff', padding : 24, margin : 0, height : '100%'}}>
                <Icon type="plus-circle-o" className="dynamic-menu__styles" />
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
      </Layout>
        )
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
