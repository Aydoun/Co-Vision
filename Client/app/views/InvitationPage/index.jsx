import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { preRequests } from 'actions/courrier';
import InvitationCard from 'components/InvitationCard';

class RequestPage extends Component {
  componentDidMount() {
    this.props.preRequests();
  }
  render() {
    const { requestList } = this.props;
    return (
      <div>
        {
          requestList.map(rq => (
            <InvitationCard
              visionName={rq.vision}
              requesterName={rq.requester}
              Motivation={rq.motivation}
              visionId={rq.vision}
            />
          ))
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preRequests }, dispatch);
}

function mapStateToProps(state) {
  return {
    requestList: state.courrier.requestList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPage);
