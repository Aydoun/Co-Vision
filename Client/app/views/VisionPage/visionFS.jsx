import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Select, Card, Modal, Icon, Menu, Row, Col, Dropdown, Badge, Button, Breadcrumb } from 'antd';
import Columns from './table-columns/fileSystem';
import { preContent, preBranch, preStat } from 'actions/vision';
import DraftForm from './createDraft';
import { formatDate } from 'utils';

const Option = Select.Option;

class VisionFS extends React.Component {

  constructor(props) {
      super(props);
      this.branchChanged = this.branchChanged.bind(this);
      this.handleMenuClick = this.handleMenuClick.bind(this);
      this.Columns = Columns.bind(this);
      this.state = {
          visible : false,
          branchName: 'master',
          newRows : []
      };
  }

  componentDidMount() {
      const _id = this.props.routeParams.id;
      const params = {
         id : _id,
      };

      this.props.preContent(params);
      this.props.preBranch(params);
      this.props.preStat(params);
  }

  branchChanged(value) {
    this.setState({ branchName: value });
    this.props.preContent({
        id : this.props.routeParams.id,
        branchName : value
    });
  }

  getRows() {
    const { visionFS } = this.props;
    const { newRows } = this.state;

    return visionFS.concat(newRows);
  }

  handleMenuClick(obj) {
    const { newRows } = this.state;
    switch (obj.key) {
      case '1':
        this.setState({ newRows: newRows.concat({ type: 'file', key: new Date().getTime() }) });
        break;
      case '2':
        this.setState({ newRows: newRows.concat({ type: 'folder', key: new Date().getTime() }) });
        break;
      case '3':
        break;
        default:
        break;
    }
  }

  render() {
    const { visionFS, branchList, contributionStats, vision } = this.props;
    const { visible } = this.state;
    const SelectBranch = (
      <div>
        <span>Drafts ({branchList.length || 0}) : </span>
        <Select
          style={{ width:155 }}
          onChange={this.branchChanged}
          defaultValue="master"
          size="large"
        >
          {
            branchList.map((item, i) => <Option key={i} value={item.name}>{item.name}</Option>)
          }
        </Select>&nbsp;&nbsp;&nbsp;
        <Button icon="plus" shape="circle"size="small" onClick={() => this.setState({ visible:true })} />
      </div>
    );
    const Choices = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <Icon type="file" /> Add File
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="folder" /> Add Folder
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <Icon type="share-alt" /> Merge Draft
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Card
          extra={SelectBranch}
          title={<span><Icon type="api" />&nbsp;&nbsp;
            {vision.title}
          </span>}

        >
          <Row style={{ marginBottom: 8 }}>
            <Col span={6}>
              <Badge count={contributionStats.totalContributions}>
                <div className="head-example" >
                  Contribution
                </div>
              </Badge>
            </Col>
            <Col span={6}>
              <Badge count={contributionStats.vision.likes}>
                <div className="head-example" >
                  Likes
                </div>
              </Badge>
            </Col>
            <Col span={6}>
              <Badge count={contributionStats.totalContributors}>
                <div className="head-example" >
                  Contributors
                </div>
              </Badge>
            </Col>
            <Col span={6}>
              <Badge
                style={{ background: 'teal' }}
                count={formatDate(contributionStats.vision.updatedAt)}
              >
                <div className="head-example" >
                  Last update
                </div>
              </Badge>
            </Col>
          </Row>

          <Table
            columns={this.Columns()}
            dataSource={this.getRows()}
            showHeader={false}
            pagination={false}
            loading={false}
          />
        </Card>
        <Modal
          visible={visible}
          title={<span><Icon type="plus" /> Add Draft</span>}
          onCancel={() => this.setState({ visible : false })}
          footer={null}
        >
          <DraftForm
            visionId={this.props.routeParams.id}
            onCancel={() => this.setState({ visible:false })}
          />
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preContent, preBranch, preStat }, dispatch);
}

function mapStateToProps(state) {
  return {
      visionFS : state.vision.visionFS,
      branchList : state.vision.branchList,
      contributionStats : state.vision.contributionStats,
      vision: state.vision.contributionStats.vision
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionFS);
