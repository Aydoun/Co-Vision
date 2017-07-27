import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';
import { Card, Tag, Button, Spin} from 'antd';
import './index.css';

import { prepareListing } from 'actions/visionAction';

class VisionPage extends Component {
  constructor(props){
      super(props);
  }

  componentDidMount(){
      // this.props.prepareListing({
      //   _id : localStorage.userId
      // });
  }

  render() {
    const {visionList , listPagination , loading} = this.props;
    return (
      <div>
          <div className="module-header">
            <h3>My Visions</h3>
          </div>

          <Spin spinning={loading}>
            {
              visionList.map(function(elem , i){
                  return (
                    <div key={i} className="list-items__margin">
                        <Card  title={<Link to={`/vision/${elem._id}/content`}>{elem.title}</Link>} >
                          <p className="bottomMargin">{elem.description}</p>
                          <div>
                            <Tag color="#2db7f5">
                              {elem.updatedAt}
                            </Tag>
                            <Tag color="#87d068">
                              {elem.createdAt}
                            </Tag>
                          </div>
                        </Card>
                    </div>
                  )
              })
            }
          </Spin>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({prepareListing} , dispatch)
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      loading : state.vision.loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionPage);
