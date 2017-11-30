import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Select, Card, Modal, Icon, Menu, Dropdown, Button, Breadcrumb } from 'antd';
import Columns from './table-columns/fileSystem';
import { preContent, preBranch, preStat } from 'actions/vision';

const Option = Select.Option;

class VisionFS extends React.Component {

  constructor(props) {
      super(props);
      this.branchChanged = this.branchChanged.bind(this);
      this.Columns = Columns.bind(this);
      this.state = {
          visible : false
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
     if (value !== '-1') {
       this.props.preContent({
           id : this.props.routeParams.id,
           branchName : value
       });
     }
  }

  render() {
    const { visionFS, branchList, contributionStats, vision } = this.props;
    const { visible } = this.state;
    const SelectBranch = (
      <div>
        <span>Drafts ({branchList.length || 0}) : </span>
        <Select style={{ width:155 }} onChange={this.branchChanged}>
          {
              branchList.map((item, i) => <Option key={i} value={item.name}>{item.name}</Option>)
            }
          <Option key="-1" value="-1">Add Draft</Option>
        </Select>
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
        <Menu.Item key="3">
          <Icon type="mail" /> Invite
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4">
          <Icon type="share-alt" /> Merge Draft
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Card
          extra={SelectBranch}
          title={<span><Icon type="link" />
            {vision.title}
          </span>}
          noHovering
        >
          <div style={{ margin:8 }}>
            <div className="global-bottom-margin">
              <span className="global-right-margin">
                <a onClick={() => this.setState({ visible: true })}>
                  {contributionStats.totalContributions}
                </a>
              </span>
              <span >Contributons
                <Dropdown overlay={Choices} placement="bottomCenter">
                  <Button type="dashed" icon="bars" shape="circle" />
                </Dropdown>
              </span>
            </div>
            <div>
              <span>
                <Breadcrumb separator=">">
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                  <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                </Breadcrumb>
              </span>
            </div>
          </div>
          <Table
            columns={this.Columns()}
            dataSource={visionFS}
            showHeader={false}
            pagination={false}
            loading={false}
          />
        </Card>
        <Modal
          visible={visible}
          title="Vision Contributors"
          onCancel={() => this.setState({ visible : false })}
        >
          {
            Object.keys(contributionStats.contributorsList).map((key, index) => (
              <p key={index}>
                <span>{key}</span>
              </p>
              ))
          }
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
