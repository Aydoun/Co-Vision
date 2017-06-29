import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {BackTop, Layout, Icon, Popover, Button} from 'antd';
import DynamicMenu from 'components/DynamicMenu';
import MenuItems from './menuItems';

const { Content, Sider } = Layout;

import Header from 'components/Header';
import Footer from 'components/Footer';
import SideBarContent from 'components/SideBar';

import './index.css';

class App extends React.Component {
    constructor(props){
       super(props);
    }

    testify(){
        console.log('testify!');
    }

    render(){

      const text = <span>Title</span>;
        return (
        <Layout>
          <BackTop />
          <Header />
          <Layout >
            <Sider width={200} style={{ background: '#fff' }}>
                <SideBarContent />
            </Sider>
            <Layout style={{ padding: '0px 8px 0px 70px' }}>
              <Content style={{position : 'relative', background:'#fff', padding : 24, margin : 0, height : '100%'}}>
                  <DynamicMenu content={MenuItems.bind(this)()} />
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
