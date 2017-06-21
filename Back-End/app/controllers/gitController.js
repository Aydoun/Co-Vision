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

    var checkRes = queryCheck(clientInput , ['repoName']);

    if (checkRes !== true) {
        throw new Error(checkRes + ' is Required');
    }

    var branchName = clientInput.branchName || 'master';
    var pathToRepo = path.resolve("C://" + clientInput.repoName);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
      return repo.getBranchCommit(branchName);
    })
    .then(function(firstCommit) {
      return firstCommit.getTree();
    })
    .then(function(tree) {
      var files = [];
      tree.entries().forEach(function(entry) {
          files.push({
              path:entry.path(),
              isDirectory : entry.isDirectory(),
              isFile : entry.isFile(),
              isTree : entry.isTree(),
              name : entry.name(),
          });
      });
      return files;
    });
}

exports.status = function(params){
    var clientInput = params;
    var pathToRepo = path.resolve("C://" + clientInput.repoName);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
        return repo.getStatus().then(function(statuses) {
          var allStatus = [];
          function statusToText(status) {
            var words = [];
            if (status.isNew()) { words.push("NEW"); }
            if (status.isModified()) { words.push("MODIFIED"); }
            if (status.isTypechange()) { words.push("TYPECHANGE"); }
            if (status.isRenamed()) { words.push("RENAMED"); }
            if (status.isIgnored()) { words.push("IGNORED"); }

            return words.join(" ");
          }

          statuses.forEach(function(file) {
            allStatus.push(file.path() + " " + statusToText(file));
          });

          return allStatus;
        });
    });
}

exports.getAllBranchList = function(params){
    var clientInput = params;
    var _entry;
    var checkRes = queryCheck(clientInput , ['repoName']);

    if (checkRes !== true) {
        throw new Error(checkRes + ' is Required');
    }

    var pathToRepo = path.resolve("C://" + clientInput.repoName);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
      return repo.getReferenceNames(3).then(function(arrayReference) {
        // Use reference
        return arrayReference
        .filter(function(elem){return elem.isBranch()})
        .map(function(reference){
            var _name = reference.toString().split('/');
            return {
                name : _name[_name.length - 1],
            }
        })
      });
    });
}

exports.createBranch = function(params){
    var clientInput = params;

    var checkRes = queryCheck(clientInput , ['repoName' , 'branchName']);

    if (checkRes !== true) {
        throw new Error(checkRes + ' is Required');
    }

    var pathToRepo = path.resolve("C://" + clientInput.repoName);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
      return repo.getHeadCommit()
      .then(function(commit) {
        return repo.createBranch(
          params.branchName,
          commit,
          0);
      });
    });
}

exports.checkoutBranch = function(params){
    var clientInput = params;

    var checkRes = queryCheck(clientInput , ['repoName' , 'branchName']);

    if (checkRes !== true) {
        throw new Error(checkRes + ' is Required');
    }

    var pathToRepo = path.resolve("C://" + clientInput.repoName);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
        repo.checkoutBranch(clientInput.branchName, {}).then(function() {
          return 'switched to ' + clientInput.branchName;
        });
    });
}

exports.readFileContent = function(params){
    var clientInput = params;
    var _entry;
    var checkRes = queryCheck(clientInput , ['repoName' , 'fileName' , 'commitSha']);

    if (checkRes !== true) {
        throw new Error(checkRes + ' is Required');
    }

    var pathToRepo = path.resolve("C://" + clientInput.repoName);

    return Git.Repository.open(pathToRepo)
      .then(function(repo) {
        return repo.getCommit(clientInput.commitSha);
      })
      .then(function(commit) {
        return commit.getEntry(clientInput.fileName);
      })
      .then(function(entry) {
        _entry = entry;
        return _entry.getBlob();
      })
      .then(function(blob) {
        //first Ten Lines
        return blob.toString().split("\n").slice(0, 10).join("\n");
      });
}

exports.gitTest = function(params){
    var clientInput = params;
    var _entry;
    var checkRes = queryCheck(clientInput , ['repoName']);

    if (checkRes !== true) {
        throw new Error(checkRes + ' is Required');
    }

    var pathToRepo = path.resolve("C://" + clientInput.repoName);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
      return repo.getReferences(3).then(function(arrayReference) {
        // Use reference
        var refs = [];
        return arrayReference
        .filter(function(elem){return elem.isBranch()})
        .map(function(reference){
            var _name = reference.toString().split('/');
            return {
                name : _name[_name.length - 1],
            }
        })
      });
    });
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
