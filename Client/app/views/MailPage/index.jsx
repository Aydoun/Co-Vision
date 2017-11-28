import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageNav from 'components/CorrespondanceNav';
import MicroMessage from 'components/MicroMessage';
import Empty from 'components/Empty';
import { Layout, Menu } from 'antd';
import { preMessage } from 'actions/mail';
import { formatDate } from 'utils';
import SendForm from './sendMessageForm';

const { Content, Sider } = Layout;

class mailPage extends React.Component {
  constructor(props) {
    super(props);
    this.onMenuChanged = this.onMenuChanged.bind(this);
    this.state = {
      conversationId: null
    };
  }
  componentDidMount() {
    this.props.preMessage();
  }

  onMenuChanged(v) {
    this.setState({ conversationId: v.key });
  }

  sendMessage(message) {
    const { conversationId } = this.state;
    console.log(message, 'message');
  }

  render() {
    const { conversations, userMeta } = this.props;
    const { conversationId } = this.state;
    const userId = localStorage.userId;
    const haveConversation = conversations.length > 0;
    const conversationIndex = haveConversation && conversationId !== null ?
                              conversations.findIndex(cv => cv._id === conversationId)
                              : 0;
    if (!haveConversation) {
      return (
        <div>
          <Empty
            message="Empty Mail Box"
          />
        </div>
      );
    }

    return (
      <Layout style={{ background: '#fff' }}>
        <Sider width={'100%'} style={{ background: '#fff' }}>
          <Menu
            onClick={this.onMenuChanged}
          >
            {
              conversations.map((cv) => {
                const userInfo = cv.creator === userId ?
                                 userMeta[cv.receiver] : userMeta[cv.creator];

                return (
                  <Menu.Item key={cv._id}>
                    <MessageNav
                      src={userInfo[0].avatar}
                      fullName={userInfo[0].fullName}
                      time={formatDate(cv.updatedAt)}
                    />
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Sider>
        <Content style={{ minHeight: 280, padding: '4px 32px' }}>
          <div>
            {
              conversations.length > 0 && conversationId !== null ?
              conversations[conversationIndex].messages.map(message => (
                <MicroMessage
                  key={message._id}
                  message={message.content}
                  time={formatDate(message.updatedAt)}
                  type={message.sender === userId ? 'sent' : 'received'}
                />
              )) : null
            }
          </div>
          <SendForm
            sendMessage={this.sendMessage}
          />
        </Content>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preMessage }, dispatch);
}

function mapStateToProps(state) {
  return {
    conversations: state.mail.mailList.conversations,
    userMeta: state.mail.mailList.userMeta
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(mailPage);
