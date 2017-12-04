import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, Modal, Icon } from 'antd';
import { preRequests } from 'actions/courrier';
import InvitationCard from 'components/InvitationCard';
import Empty from 'components/Empty';
import SendMessageForm from './sendMessageForm';

class RequestPage extends Component {
  state = {
    visible: false
  }
  constructor(props) {
    super(props);
    this.onMenuClicked = this.onMenuClicked.bind(this);
    this.state = {
      visible: false,
      requesterId: null,
    };
  }
  componentDidMount() {
    this.props.preRequests();
  }

  onMenuClicked(obj, requesterId) {
    console.log(requesterId, 'requesterId');
    switch (obj.key) {
      case '0':

        break;
      case '1':

        break;
      case '2':
        this.setState({ visible:true, requesterId });
        break;
      default:
        break;
    }
  }

  render() {
    const { requestList, loading } = this.props;
    const { visible, requesterId } = this.state;
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
                requesterId={rq.requester}
                visionName={rq.visionName}
                requesterName={rq.userName}
                Motivation={rq.motivation}
                visionId={rq.vision}
                visionAvatar={rq.visionAvatar}
                onClick={this.onMenuClicked}
              />
            ))
          }
        </Spin>
        <Modal
          visible={visible}
          onCancel={() => this.setState({ visible: false })}
          title={<span><Icon type="message" /> Send Message</span>}
          footer={null}
        >
          <SendMessageForm
            onCancel={() => this.setState({ visible:false })}
            requesterId={requesterId}
          />
        </Modal>
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
