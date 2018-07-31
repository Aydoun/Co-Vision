import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Select, Row, Col, Modal, Icon, Button, Tooltip, Avatar } from 'antd';
import Columns from './table-columns/fileSystem';
import { preContent, preBranch } from 'actions/vision';
import DraftForm from './createDraft';

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
  }

  branchChanged(value) {
    if (value == -1) {
        this.setState({ visible: true });
        return;
    }

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
    const { visionFS, branchList, vision } = this.props;
    const { visible } = this.state;
    const SelectBranch = (
      <div>
        <Select
          style={{ width:200 }}
          onChange={this.branchChanged}
          defaultValue="master"
        >
          {
            branchList.map((item, i) => <Option key={i} value={item}>{item}</Option>)
          }
          <Option key={branchList.length + 1} value="-1">Add Draft</Option>
        </Select>
      </div>
    );

    return (
      <div>
        <div className="vision-container__global">
          <Avatar style={{ verticalAlign: 'middle' }} src={vision.avatar} shape="circle" size="large" />
          <span className="vision-name">{vision.title}</span>
        </div>
        <Row type="flex" gutter={8}>
          <Col>
            <Tooltip title="Add File">
              <Button icon="file-add" />
            </ Tooltip>
          </Col>
          <Col>
            <Tooltip title="Add Folder">
              <Button icon="folder-add" />
            </ Tooltip>
          </Col>
          <Col>{SelectBranch}</Col>
          <Col>
            <Button type="primary" icon="fork" >
                Merge
            </Button>
          </Col>
          <Col>
            <Button icon="save" type="primary" >
              Save
            </Button>
          </Col>
        </Row>
        <Table
          columns={this.Columns()}
          dataSource={this.getRows()}
          style={{ marginTop: 20 }}
          pagination={false}
          loading={false}
          size="small"
        />
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
  return bindActionCreators({ preContent, preBranch }, dispatch);
}

function mapStateToProps(state) {
  return {
      visionFS : state.vision.visionFS,
      branchList : state.vision.branchList,
      vision: state.vision.currentVision,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionFS);
