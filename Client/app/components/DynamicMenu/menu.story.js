import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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

storiesOf('Dynamic Menu', module)
  .add('Basic Usage', () => (
    <View content={sampleContent} />
  ))
  