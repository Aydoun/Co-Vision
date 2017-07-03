import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {Card , Tag , Button , Pagination , Spin} from 'antd';
import {getVisionCardExtra} from './utils';
import {GlobalPagination} from 'utils';
import './index.css';

import { prepareListing } from 'actions/visionAction';

class VisionPage extends React.Component {

  componentDidMount(){
      this.props.prepareListing({
        _id : localStorage.userId
      });
  }

  onMenuSelectedItem(_id){
  }

  onPageChange(page, pageSize){
  }

  render() {
    const {visionList , listPagination , loading} = this.props;
    var _this = this;

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
            <Pagination onChange={this.onPageChange.bind(this)} {...listPagination} />
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
      listPagination : GlobalPagination(state.vision.visionList)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionPage);
