import React from 'react';
import { storiesOf } from '@storybook/react';
import View from './index';

const data = {
    creator: 'Mohamed Amine',
    totalContributors: 9,
    totalContributions: 120,   
    vision: {
      likes: 8
    }
}

storiesOf('Summary Bar', module)
  .add('First Draft', () => (
    <View summaryData={data}/>
  ));
