import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import find from 'lodash/find';
import {Icon , Table , Select} from 'antd';
import Columns from './table-columns/fileSystem';
import { preContent , preBranch } from 'actions/visionAction';

const Option = Select.Option;

class VisionFS extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          VisionObject : null
      }
  }

  componentDidMount() {
      var _id = this.props.routeParams.id;
      var FoundVision = find(this.props.visionList , ['_id' , _id]);

      if (FoundVision) {
        var params = {
           id : _id,
           repoName : FoundVision.title
        }
        this.props.preContent(params);
        this.props.preBranch(params);
      }
  }

  branchChanged(value , label){
      const {VisionObject} = this.state;

      this.props.preContent({
          id : this.props.routeParams.id,
          repoName : VisionObject.title,
          branchName : value
      });
  }

  componentWillReceiveProps(nextProps) {
      var _id = this.props.routeParams.id;
      var Found = find(nextProps.visionList , ['_id' , _id]);

      if (Found && this.state.VisionObject == null) {
          this.setState({VisionObject : Found});
      }
  }

  render() {
    const {visionFS , branchList} = this.props;
    const {VisionObject} = this.state;

    return (
      <div>
        <h3>Vision {VisionObject ? VisionObject.title : ''} Content</h3>
        <div className="bottomMargin">
          <label>Branches : </label>
          <Select style={{width:155}} onChange={this.branchChanged.bind(this)}>
              {
                branchList.map((item , i) => <Option key={i} value={item.name}>{item.name}</Option>)
              }
          </Select>
        </div>
        <hr/>
        <Table
          columns={Columns.bind(this)()}
          dataSource={visionFS}
          showHeader={false}
          pagination={false}
          loading={false}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({preContent , preBranch} , dispatch)
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      visionFS : state.vision.visionFS,
      branchList : state.vision.branchList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionFS);
