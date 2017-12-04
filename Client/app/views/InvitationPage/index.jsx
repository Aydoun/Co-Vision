import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';
import { preRequests } from 'actions/courrier';
import InvitationCard from 'components/InvitationCard';
import Empty from 'components/Empty';

class RequestPage extends Component {
  componentDidMount() {
    this.props.preRequests();
  }
  render() {
    const { requestList, loading } = this.props;

    if (!loading && requestList.length === 0) {
      return (
        <div>
          <Empty
            message={<span>
              No Pending Requests
            </span>}
          />
        </div>
      );
    }

    return (
      <div>
        <Spin spinning={loading}>
          {
            requestList.map(rq => (
              <InvitationCard
                key={rq._id}
                visionName={rq.visionName}
                requesterName={rq.userName}
                Motivation={rq.motivation}
                visionId={rq.vision}
              />
            ))
          }
        </Spin>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preRequests }, dispatch);
}

function mapStateToProps(state) {
  return {
    requestList: state.courrier.requestList,
    loading: state.courrier.loading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPage);
