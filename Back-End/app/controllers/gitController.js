var Git = require('../../nodegit');
var path = require('path');
var {queryCheck , Formatter} = require('../lib');
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));

exports.commit = function(inputs) {
      var clientInput = inputs;
      // var checkRes = queryCheck(clientInput , ['fileContent' , 'fileName' , 'repoName' , 'author' , 'authorMail' , 'message']);
      var checkRes = queryCheck(clientInput , ['fileContent' , 'repoName' , 'message' , 'fileName']);

      if (checkRes !== true) {
          return checkRes + ' is Required';
      }

      clientInput = Object.assign({} , {
          author : 'Amino',
          authorMail : 'aydoun@qq.com',
      } , clientInput)


      var pathToRepo = path.resolve("C://" + clientInput.repoName);

      return Git.Repository.open(pathToRepo)
      .then(function(repository){
          return repository;
      })
      .then(function(repo){
          return registerCommit(clientInput , repo);
      });
};

exports.history = function(res , params) {
    var clientInput = params;

    var checkRes = queryCheck(clientInput , ['repoName']);

    if (checkRes !== true) {
        res.status(200).send(Formatter(checkRes + ' is Required' , true))
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
              sha : commit.sha(),
              Author : commit.author().name() + " <" + commit.author().email() + ">",
              Date : commit.date(),
              comment : commit.message()
          })
        });

        history.on('end', function(commits) {
          // Use commits
          res.status(200).send(Formatter(infoHistory));
        });

        history.start();
    })
    .catch(function(err){
        console.log(err , "Catched Error");
    });
};

exports.initRepository = function(inputs){
    var clientInput = inputs;
    //var checkRes = queryCheck(clientInput , ['repoName' , 'description' , 'author' , 'authorMail']);
    var checkRes = queryCheck(clientInput , ['repoName' , 'description']);

    if (checkRes !== true) {
        return checkRes + ' is Required';
    }

    clientInput  = Object.assign({} , {
        repoName : 'testRepo',
        description : 'description',
        author : 'Amino',
        authorMail : 'aydoun@qq.com',
    } , clientInput);

    var pathToRepo = path.resolve("C://" + clientInput.repoName);

    return Git.Repository.init(pathToRepo, 0).then(function (repo) {
        var inputs = Object.assign({} , clientInput , {
            fileName : "Readme.md",
            fileContent : clientInput.description,
            message : clientInput.repoName + ' Vision is Born!',
            initalCommit : true
        });

        return registerCommit(inputs , repo);
    });
}

exports.treeWalk = function(res , params){
    var clientInput = params;

    var pathToRepo = path.resolve("C://" + clientInput.repoName);

    Git.Repository.open(pathToRepo)
    .then(function(repo) {
      return repo.getMasterCommit();
    })
    .then(function(firstCommitOnMaster) {
        return firstCommitOnMaster.getTree();
    })
    .then(function(tree) {
      // `walk()` returns an event.
      var walker = tree.walk();
      var files = [];
      walker.on("entry", function(entry) {
        files.push({
            path:entry.path(),
            isDirectory : entry.isDirectory(),
            isFile : entry.isFile(),
            isTree : entry.isTree(),
            name : entry.name(),
        });
      });

      walker.on('end', function() {
        res.status(200).send(Formatter(files));
      });

      walker.start();
    })
    .done();
}

/*
  Helper Functions

*/
function registerCommit(inputs , repo) {
        var fileName = inputs.fileName;
        var fileContent = inputs.fileContent;
        var index;
        var oid;

return fse.writeFile(path.join(repo.workdir(), fileName), fileContent)
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
            console.log(inputs , 'inputs');
            var _parent = inputs.initalCommit ? [] : [parent];
            var now = Date.now() / 1000;
            var author = Git.Signature.create(inputs.author,
              inputs.authorMail, now, 480);
            var committer = Git.Signature.create(inputs.author,
              inputs.authorMail, now, 480);

            return repo.createCommit("HEAD", author, committer, inputs.message, oid, _parent);
        })
        .then(function(commitId){
            console.log(commitId.tostrS());
            return commitId.tostrS();
        })
        .catch(function(err){
            console.log(err);
        })
}
