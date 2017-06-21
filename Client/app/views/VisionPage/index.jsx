import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {Timeline , Card , Tag , Button} from 'antd';

import { prepareListing } from 'actions/visionAction';

class VisionPage extends React.Component {

  componentDidMount(){
      this.props.prepareListing();
  }

  render() {
    const {visionList} = this.props;

    return (
      <div>
          {
            visionList.map(function(elem , i){
                return (
                  <div className="list-items__margin">
                    <Card key={i} title={elem.title} extra={<a href="#">More</a>}>
                      <p className="bottomMargin">{elem.description}</p>
                      <p>
                        <Tag color="#2db7f5">
                          {elem.updatedAt}
                        </Tag>
                        <Tag color="#87d068">
                          {elem.createdAt}
                        </Tag>
                      </p>
                    </Card>
                  </div>
                )
            })
          }
          <Button style={{width:'100%'}}>More</Button>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionPage);
