import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Row, Col, Avatar, Tabs, Table, Select, List } from 'antd';
import Columns from './table-columns/fileSystem';
import { preContent, preBranch, preStat } from 'actions/vision';
import HistoryLogs from './visionHistory';
import { formatDate } from 'utils';

const TabPane = Tabs.TabPane;

class VisionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.Columns = Columns.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.routeParams;
    const params = {
        id,
    };

    this.props.preStat(params);
    this.props.preContent(params);
  }

  render() {
    const { vision, contributionStats, routeParams, visionFS, branchList } = this.props;
    const visionDetails = (
      <Row style={{ display: 'inline-block', marginLeft: 8 }}>
          <Col>
            <h3>{vision.title }</h3>
            <Icon type="clock-circle-o" />&nbsp;
            <time>{formatDate(vision.updatedAt)}</time>&nbsp;&nbsp;
            <Icon type="like-o" />&nbsp;&nbsp;
            <span>{vision.likes}</span>
          </Col>
        </Row>
    );

    const SelectBranch = (
      <div>
        <Select
          style={{ width:200 }}
          defaultValue="master"
          className="global-bottom-margin"
        >
          {
            branchList.map((item, i) => <Option key={i} value={item}>{item}</Option>)
          }
        </Select>
      </div>
    );

    return (
      <div>
        <div className="vision-container__global">
          <Avatar src={vision.avatar} shape="circle" size="large" />
          { visionDetails }
        </div>
        <div>
          { SelectBranch }
        </div>
        <div>
          <Tabs type="card" >
            <TabPane tab="Files" key="1">
              <Table
                columns={this.Columns()}
                dataSource={visionFS}
                style={{ marginTop: 20 }}
                pagination={false}
                loading={false}
                size="small"
              />
            </TabPane>
            <TabPane tab="Timeline" key="2">
              <HistoryLogs id={routeParams.id} />  
            </TabPane>
            <TabPane tab={`Contributors (${contributionStats.totalContributors})`} key="3">
              <List
                itemLayout="horizontal"
                dataSource={contributionStats.contributors}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href="javascript:void(0)">{item.fullName}</a>}
                      description={item.email}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preStat, preContent, preBranch }, dispatch);
}

function mapStateToProps(state) {
  return {
    vision: state.vision.contributionStats.vision,
    contributionStats : state.vision.contributionStats,
    visionFS : state.vision.visionFS,
    branchList : state.vision.branchList,
};
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionHistory);
