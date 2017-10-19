import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Card, Input, Radio, Slider,Row, Col, Icon } from 'antd';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const formatter = value => `${value} days`; 

const CardTitle = (
  <div>
    <Icon type="filter" />
    <span style={{marginLeft:8}}>Filter</span>
  </div>
);

export default class Filter extends Component {
  render() {
    return (
      <div style={{margin:10}}>
        <Row>
          <Col span={8} xs={8}>
            <Card
            title={CardTitle}
            noHovering
            >
              <Row>
                <Col >
                  <Input placeholder="keyword" />
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col >
                  <h4>Last Activity:</h4>
                  <Slider defaultValue={3} max={8} step={1} tipFormatter={formatter} />
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col  size="small">
                  <h4 className="filter-label">Active Contributors:</h4>
                  <RadioGroup defaultValue="a">
                    <RadioButton value="a">10+</RadioButton>
                    <RadioButton value="b">100+</RadioButton>
                    <RadioButton value="c">1000+</RadioButton>
                    <RadioButton value="d">All</RadioButton>
                  </RadioGroup>
                </Col>         
              </Row>
            </Card>
          </Col>
        </Row>
      </div> 
    );
  }
}
