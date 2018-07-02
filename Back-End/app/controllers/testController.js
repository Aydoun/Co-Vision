var {
    gitTest
} = require('./gitController');
const promisify = require("promisify-node");
const fse = require("fs-extra");
const fs = require('fs');
const pfs = promisify(require("fs"));

var { Formatter, defaultGitPath } = require('../lib');

exports.testify = function(req , res , next){
    example("output.txt");
    
}

async function example (f) {
    try {
      await fse.outputFile(f, 'hello!')
  
      const data = await fs.readFile(f, 'utf8')
  
      console.log(data) // => hello!
    } catch (err) {
      console.error(err)
    }
  }

