import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Icon, Row, Col, Avatar, Tabs } from 'antd';
import SummaryBar from 'components/SummaryBar';
import { preStat } from 'actions/vision';
import HistoryLogs from './visionHistory';
import { formatDate } from 'utils';

const TabPane = Tabs.TabPane;

class VisionHistory extends React.Component {
  componentDidMount() {
    const _id = this.props.routeParams.id;
      const params = {
         id : _id,
      };

      this.props.preStat(params);
  }

  render() {
    const { vision, contributionStats, routeParams } = this.props;
    console.log(contributionStats, 'stats');
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

    return (
      <div>
        <div className="vision-container__global">
          <Avatar src={vision.avatar} shape="circle" size="large" />
          { visionDetails }
        </div>
        <div>
          <Tabs type="card">
            <TabPane tab="Files" key="1">Files</TabPane>
            <TabPane tab="Timeline" key="2">
              <HistoryLogs id={routeParams.id} />
            </TabPane>
            <TabPane tab={`Contributors (${contributionStats.totalContributors})`} key="3">
              {
                Object.keys(contributionStats.contributors).map(c => <p>{c}</p>)
              }
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preStat }, dispatch);
}

function mapStateToProps(state) {
  return {
    vision: state.vision.contributionStats.vision,
    contributionStats : state.vision.contributionStats,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionHistory);
