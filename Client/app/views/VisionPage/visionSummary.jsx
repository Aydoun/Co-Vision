import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Icon, Row, Col } from 'antd';
import SummaryBar from 'components/SummaryBar';
import HistoryLogs from './visionHistory';

class VisionHistory extends React.Component {
  componentDidMount() {

  }

  render() {
    const { vision, summaryData, routeParams } = this.props;
    const cardTitle = (
      <Row type="flex" gutter={12}>
          <Col>
            <Icon type="api" />
          </Col>
          <Col>
            <h3>{vision.name }</h3>
            <time>{vision.lastUpdate}</time>
          </Col>
        </Row>
    )

    return (
      <div>
        <Card
          title={cardTitle}
        > 
          <SummaryBar summaryData={summaryData} /><br/>
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
  return bindActionCreators({ }, dispatch);
}

function mapStateToProps(state) {
  return {
    vision: {}, 
    summaryData: {}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionHistory);
