import { injectGlobal } from 'styled-components';

injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background:#ccc;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  a {
    text-decoration: none;
    font-size:14px;
  }

  ul , li {
    list-style: none;
    margin: 0;
    padding:0;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .left {
      float: left;
  }

  .right {
      float: right;
  }

  .list-items__margin{
    margin-bottom:8px;
  }
  .bottomMargin {
      margin-bottom : 8px;
  }

  .global-padding{
    padding:4px;
  }

  .ant-popover-inner-content{
    background:#f9f9f9;
  }
`;
