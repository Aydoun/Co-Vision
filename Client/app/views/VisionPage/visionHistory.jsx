import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import find from 'lodash/find';
import {Timeline , Icon , Card , Tag , Spin , Pagination} from 'antd';

import { preHistory } from 'actions/visionAction';
import {GlobalPagination} from 'utils';

class VisionHistory extends React.Component {
  componentDidMount() {
      var _id = this.props.routeParams.id;
      var FoundVision = find(this.props.visionList , ['_id' , _id]);

      if (FoundVision) {
        var params = {
           id : _id,
           repoName : FoundVision.title
        }
        this.props.preHistory(params);
      }
  }

  onPageChange(page, pageSize){
      console.log(page, pageSize);
  }

  render() {
    const {historyList , listPagination , loading} = this.props;

    return (
      <div>
          <Spin spinning={loading}>
            <Timeline>
              {
                  historyList.map(function(elem , i){
                      return (
                          <Timeline.Item key={i}>
                              <p>{elem.Date}</p>
                              <Card title={elem.comment} >
                                  <Tag>{elem.Author}</Tag>
                              </Card>
                          </Timeline.Item>
                      )
                  })
              }
            </Timeline>
            <Pagination onChange={this.onPageChange.bind(this)} {...listPagination} />
          </Spin>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({preHistory} , dispatch)
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      loading : state.vision.loading,
      historyList : state.vision.historyList,
      listPagination : GlobalPagination(state.vision.historyList)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionHistory);
