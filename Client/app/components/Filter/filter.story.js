import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from 'antd';
import View from './index';

const sampleContent = [
    {
        type:'link',
        text:'lala'
    },
    {
        type:'link',
        text:'gala'
    },
    {
        type:'link',
        text:'nala'
    },
]

storiesOf('Filter', module)
  .add('Basic Usage', () => (
    <View content={sampleContent} />
  ))
  