import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {Card , Tag , Button , Pagination} from 'antd';
import {getVisionCardExtra} from './utils';

import { prepareListing } from 'actions/visionAction';

class VisionPage extends React.Component {

  componentDidMount(){
      this.props.prepareListing();
  }

  onMenuSelectedItem(_id){
      console.log('received Id : ' , _id);
  }

  onPageChange(page, pageSize){
    console.log(page, pageSize);
  }

  render() {
    const {visionList , listPagination} = this.props;
    var _this = this;

    return (
      <div>
          {
            visionList.map(function(elem , i){
                return (
                  <div key={i} className="list-items__margin">
                    <Card  title={elem.title} extra={getVisionCardExtra.bind(_this)(elem._id)}>
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
      listPagination : {
          total : state.vision.visionList.length,
          showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,
          pageSize:5
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionPage);
