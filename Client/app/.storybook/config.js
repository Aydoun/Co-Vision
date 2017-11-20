import { configure } from '@storybook/react';
import 'antd/dist/antd.min.css';
import './index.css';

const req = require.context('../components/', true, /\.story\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
