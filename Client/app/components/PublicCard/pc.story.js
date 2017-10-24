import React from 'react';
import { storiesOf } from '@storybook/react';
import View from './index';



storiesOf('User Public Card', module)
  .add('First Draft', () => (
    
    <View 
        fullName="Clara Morgane"
        contact={[{
          type:'mail',
          value:'aydoun@qq.com'
          },
          {
            type: 'phone',
            value: '+86 15112524070'
          },
        ]}
        profession="She Is Kinda Hot"
        summary="Active"
        visionsCardinal={2}
        memberSince={'2017-01-23'}
    />
  ))
  