import React from 'react';
import { storiesOf } from '@storybook/react';
import View from './index';

storiesOf('Correspondance List', module)
  .add('Sent Message', () => ( 
    <View 
        fullName="Clara Morgane"
        time="26 Sep"
        src="http://tse1.mm.bing.net/th?id=OIP.6cn8D3iuNf1GIlUs0l58yQEsEs&w=184&h=178&c=7&qlt=90&o=4&pid=1.7"
    />
  ))
  