var Git = require('../../nodegit');
var path = require('path');
var {queryCheck} = require('../lib');
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));

exports.commit = function(req, res, next) {
      var clientInput = req.body;
      var checkRes = queryCheck(clientInput , ['fileContent' , 'fileName' , 'repoName' , 'author' , 'authorMail' , 'message']);

      if (checkRes !== true) {
          res.status(200).send({data : 'Nope' , msg : checkRes + ' is Required'});
          return ;
      }

      var pathToRepo = path.resolve("C://" + clientInput.repoName);

      Git.Repository.open(pathToRepo)
      .then(function(repository){
          return repository;
      })
      .then(function(repo){
          registerCommit(res , clientInput , repo);
      })
      .catch(function(err){
          res.status(200).send({data : 'Nope2' , err : err});
      });
};

exports.history = function(req, res, next) {
    var clientInput = req.query;

    var checkRes = queryCheck(clientInput , ['repoName']);

    if (checkRes !== true) {
        res.status(200).send({data : 'Nope' , msg : checkRes + ' is Required'});
        return ;
    }
    var pathToRepo = path.resolve("C://" + clientInput.repoName);

    Git.Repository.open(pathToRepo)
    .then(function(repository) {
        return repository.getMasterCommit();
    })
    .then(function(firstCommitOnMaster){
        var history = firstCommitOnMaster.history(Git.Revwalk.SORT.Time);
        var infoHistory = [];

        history.on("commit", function(commit) {
          infoHistory.push({
              serialCode : commit.sha(),
              Author : commit.author().name() + " <" + commit.author().email() + ">",
              Date : commit.date(),
              comment : commit.message()
          })
        });

        history.on('end', function(commits) {
          // Use commits
          res.status(200).send({data : infoHistory});
        });

        history.start();
    })
    .catch(function(err){
        console.log(err , "Catched Error");
    });
};

exports.initRepository = function(req , res, next){
    var clientInput = req.body;
    var checkRes = queryCheck(clientInput , ['repoName' , 'description' , 'author' , 'authorMail']);

    if (checkRes !== true) {
        res.status(200).send({data : 'Nope' , msg : checkRes + ' is Required'});
        return ;
    }

    var pathToRepo = path.resolve("C://" + clientInput.repoName);

    Git.Repository.init(pathToRepo, 0).then(function (repo) {
        var inputs = Object.assign({} , clientInput , {
            fileName : "Readme.md",
            fileContent : clientInput.description,
            message : clientInput.repoName + ' Vision is Born!',
            initalCommit : true
        });

        registerCommit(res , inputs , repo);
    });
}

/*
  Helper Functions

*/
function registerCommit(res , inputs , repo) {
      var fileName = inputs.fileName;
      var fileContent = inputs.fileContent;
      var index;
      var oid;

      fse.writeFile(path.join(repo.workdir(), fileName), fileContent)
      .then(function() {
          return repo.refreshIndex();
      })
      .then(function(indexResult) {
          index = indexResult;
      })
      .then(function() {
          return index.addByPath(fileName);
      })
      .then(function() {
          return index.write();
      })
      .then(function() {
          return index.writeTree();
      })
      .then(function(oidResult){
          oid = oidResult;
          if (!inputs.initalCommit) {
              return Git.Reference.nameToId(repo, "HEAD");
          }
      })
      .then(function(head){
          if (!inputs.initalCommit) {
              return repo.getCommit(head);
          }
      })
      .then(function(parent){
          var _parent = inputs.initalCommit ? [] : [parent];
          var now = Date.now() / 1000;
          var author = Git.Signature.create(inputs.author,
            inputs.authorMail, now, 480);
          var committer = Git.Signature.create(inputs.author,
            inputs.authorMail, now, 480);

          return repo.createCommit("HEAD", author, committer, inputs.message, oid, _parent);
      })
      .then(function(commitId){
          res.status(200).send({data : 'Yep' , Id : commitId.tostrS()});
      })
      .catch(function(err){
          res.status(200).send({data : 'Nope' , err : err});
      })
}