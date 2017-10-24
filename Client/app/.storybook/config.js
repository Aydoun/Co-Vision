import { configure } from '@storybook/react';
import 'antd/dist/antd.min.css';
import './index.css';

function loadStories() {
  require('../components/Header/header.story.js');
  require('../components/Filter/filter.story.js');
  require('../components/VisionCard/vc.story.js');
  require('../components/PublicCard/pc.story.js');
  require('../components/ProfileSideNav/psn.story.js');
  require('../components/MicroMessage/mm.story.js');
  require('../components/CorrespondanceNav/cn.story.js');
}

configure(loadStories, module);