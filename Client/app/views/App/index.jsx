import React from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';
import SideBar from 'components/SideBar';

import 'assets/public/skeleton.css';
import './index.css';

class App extends React.Component {
    constructor(props){
       super(props);
    }

    render(){
        return (
          <div >
            <Header />
            <div className="app-general__wrapper">
              <div className="side-bar__wrapper">
                  <SideBar />
              </div>
              <div className="">
                <div className="container main-content__wrapper">
                    {React.Children.toArray(this.props.children)}
                </div>
              </div>
            </div>
            <div style={{clear:'both'}}></div>
            <Footer />
          </div>
        )
    }
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
