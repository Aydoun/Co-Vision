import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Icon, Row, Col } from 'antd';
import SummaryBar from 'components/SummaryBar';
import { preStat } from 'actions/vision';
import HistoryLogs from './visionHistory';
import { formatDate } from 'utils';

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
    const cardTitle = (
      <Row type="flex" gutter={12}>
          <Col>
            <Icon type="api" />
          </Col>
          <Col>
            <h3>{vision.title }</h3>
            <time>{formatDate(vision.updatedAt)}</time>
          </Col>
        </Row>
    );

    return (
      <div>
        <Card
          title={cardTitle}
        > 
          <SummaryBar summaryData={contributionStats} /><br/>
          <Row gutter={8}>
            <Col span={12} >
            </Col>
            <Col span={12} >
              <h3>Vision Log</h3>
              <hr />
              <HistoryLogs id={routeParams.id} />
            </Col>
          </Row>
        </Card>
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
