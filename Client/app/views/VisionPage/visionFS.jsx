import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import find from 'lodash/find';
import {Icon , Table , Select, Card, Row, Col} from 'antd';
import Columns from './table-columns/fileSystem';
import { preContent , preBranch, preStat } from 'actions/visionAction';
import { formatDate } from 'utils';

const Option = Select.Option;

class VisionFS extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          VisionObject : {}
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
        this.props.preStat(params);
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

  componentWillMount(nextProps) {
      var _id = this.props.routeParams.id;
      var Found = find(this.props.visionList , ['_id' , _id]);

      if (Found) {
          this.setState({VisionObject : Found});
      }
  }

  render() {
    const {visionFS , branchList, contributionStats} = this.props;
    const { VisionObject } = this.state;

    return (
      <div>
        <Card>
          <Row gutter={12}>
            <Col span={6}>{VisionObject.title || ''}</Col>
            <Col span={6}>{formatDate(VisionObject.updatedAt || '')}</Col>
            <Col span={6}>{contributionStats.totalContributions || ''}</Col>
            <Col span={6}>{contributionStats.totalContributors || ''}</Col>
          </Row>
        </Card>
        <br/>
        <div className="bottomMargin">
          <label>Branches ({branchList.length || ''}) : </label>
          <Select style={{width:155}} onChange={this.branchChanged.bind(this)}>
              {
                branchList.map((item , i) => <Option key={i} value={item.name}>{item.name}</Option>)
              }
          </Select>
        </div>
        <br/>
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
  return bindActionCreators({preContent , preBranch, preStat} , dispatch)
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      visionFS : state.vision.visionFS,
      branchList : state.vision.branchList,
      contributionStats : state.vision.contributionStats
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionFS);
