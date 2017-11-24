import React from 'react';
import { Card, Input, Slider, Row, Col, Icon, Select } from 'antd';

const Option = Select.Option;
const Search = Input.Search;
const formatter = value => `${value} days`;
const CardTitle = (
  <div>
    <Icon type="filter" />
    <span style={{ marginLeft:8 }}>Filter</span>
  </div>
);

export default props => (
  <Row>
    <Col >
      <Card
        title={CardTitle}
        noHovering
        bordered={false}
      >
        <Row>
          <Col >
            <Search
              placeholder="Keyword"
              onSearch={value => console.log(value)}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col >
            <h4>Last Activity:</h4>
            <Slider
              defaultValue={3}
              max={8}
              step={1}
              tipFormatter={formatter}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col span={24} size="small">
            <h4 className="filter-label">Active Contributors:</h4>
            <Select defaultValue="a" size="large" style={{ width: 150 }} >
              <Option value="a">10+</Option>
              <Option value="b">100+</Option>
              <Option value="c">1000+</Option>
              <Option value="d">All</Option>
            </Select>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
);

// export default class Filter extends PureComponent {
//   render() {
//     return (
//
//     );
//   }
// }
