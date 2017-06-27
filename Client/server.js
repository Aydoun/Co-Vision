require('babel-register');
const webpack = require('webpack');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./webpack.config');
const devMiddleWare = require('webpack-dev-middleware');
const hotMiddleWare = require('webpack-hot-middleware');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;
const port = isProduction ? (process.env.PORT || 8300) : 3001;

app.use(helmet());
app.use(bodyParser.json({ type: 'application/json' }));

const publicPath = path.resolve(__dirname, 'dist');

if (isDeveloping) {
  const compiler = webpack(config);
  app.use(devMiddleWare(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
  }));

  app.use(hotMiddleWare(compiler));
  app.set('views', path.join(__dirname));
  app.set('view engine', 'ejs');
} else {
  app.use(express.static(publicPath));
  app.set('views', path.join(__dirname, 'dist'));
  app.set('view engine', 'ejs');
}

app.get('*', (req, res) => {
    res.render('index', {});
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running on port, ${port}!`);
});
