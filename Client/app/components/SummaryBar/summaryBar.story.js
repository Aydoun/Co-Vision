import React from 'react';
import { storiesOf } from '@storybook/react';
import View from './index';

const data = {
    creator: 'Mohamed Amine',
    contributors: 9,
    contributions: 120,
    likes: 8
}

storiesOf('Summary Bar', module)
  .add('First Draft', () => (
    <View summaryData={data}/>
  ));
