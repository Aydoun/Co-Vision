var Git = require('../../nodegit');
var path = require('path');
var { queryCheck , Formatter, defaultGitPath} = require('../lib');
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));

exports.commit = function(inputs) {
      var clientInput = inputs;
      var checkRes = queryCheck(clientInput , ['fileContent' , 'fileName' , 'title' , 'author' , 'authorMail' , 'message']);

      if (checkRes !== true) {
          throw new Error('Missing Required Paramenters');
      }

      var pathToRepo = defaultGitPath(clientInput.title);

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

    var pathToRepo = defaultGitPath(params.id);
    var branchName = clientInput.branchName || 'master';

    Git.Repository.open(pathToRepo)
    .then(function(repository) {
        return repository.getBranchCommit(branchName);
    })
    .then(function(firstCommit){
        var history = firstCommit.history(Git.Revwalk.SORT.Time);

        history.on("commit", function(commit) {
        });

        history.on('end', function(commits) {
          // Use commits
          var results = commits.map(function(commit) {
              return {
                  sha : commit.sha(),
                  Author : commit.author().name() + " <" + commit.author().email() + ">",
                  Date : commit.date(),
                  comment : commit.message()
              }
          });
          res.status(200).send(Formatter(results));
        });

        history.start();
    })
    .catch(function(err){
        console.log(err , "Catched Error");
    });
};

exports.initRepository = function(inputs){
    const pathToRepo = defaultGitPath(inputs.id);

    return Git.Repository.init(pathToRepo, 0)
    .then(function (repo) {
        const extraInputs = Object.assign({} , inputs , {
            fileName : "Readme.md",
            fileContent : inputs.description || '',
            message : `${inputs.title || '<No-Title>'} Vision is Born!`,
            initalCommit : true
        });

        return registerCommit(extraInputs , repo);
    });
}

exports.treeWalk = function(res , params){
    var clientInput = params;
    var sha;

    var checkRes = queryCheck(clientInput , ['title']);

    if (checkRes !== true) {
        throw new Error('Missing Required Paramenters');
    }

    var branchName = clientInput.branchName || 'master';
    var pathToRepo = defaultGitPath(clientInput.title);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
      return repo.getBranchCommit(branchName);
    })
    .then(function(firstCommit) {
      sha = firstCommit.sha();
      return firstCommit.getTree();
    })
    .then(function(tree) {
      var files = [];
      var index = 0;
      tree.entries().forEach(function(entry) {
          files.push({
              path:entry.path(),
              key : entry.sha(),
              sha : sha,
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
    var pathToRepo = defaultGitPath(clientInput.title);

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

exports.treeSummary = function(res , req){
  const pathToRepo = defaultGitPath(req.params.id);
  const branchName = req.query.branchName || 'master';

  Git.Repository.open(pathToRepo)
  .then(function(repository) {
      return repository.getBranchCommit(branchName);
  })
  .then(function(firstCommit){
      const history = firstCommit.history();

      var contributors = {};

      history.on("commit", function(commit) {
          const author = commit.author();
          const email = author.email();
          const name = author.name();

          if (contributors.hasOwnProperty(email)) {
            //if contributor already counted in
            contributors[email] += 1;
          } else {
            //save the first comer
            contributors[email] = 1
          }
      });

      history.on('end', function(commits) {
        res.status(200).send(Formatter({
            totalContributions : commits.length,
            contributorsList : contributors
        }));
      });

      history.start();
  })
  .catch(function(err){
      console.log(err , "Catched Error");
  });
}


exports.getAllBranchList = function(params){
    var clientInput = params;
    var _entry;
    var checkRes = queryCheck(clientInput , ['title']);

    if (checkRes !== true) {
        throw new Error('Missing Required Paramenters');
    }

    var pathToRepo = defaultGitPath(clientInput.title);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
      return repo.getReferenceNames(3).then(function(arrayReference) {
        // Use reference
        return arrayReference
        //.filter(function(elem){return elem.isBranch()})
        .map(function(reference){
            return {
                name : reference.toString().replace('refs/heads/', ''),
            }
        })
      });
    });
}

exports.createBranch = function(params){
    var clientInput = params;

    var checkRes = queryCheck(clientInput , ['title' , 'branchName']);

    if (checkRes !== true) {
        throw new Error('Missing Required Paramenters');
    }

    var pathToRepo = defaultGitPath(clientInput.title);

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

    var checkRes = queryCheck(clientInput , ['title' , 'branchName']);

    if (checkRes !== true) {
        throw new Error('Missing Required Paramenters');
    }

    var pathToRepo = defaultGitPath(clientInput.title);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
        repo.checkoutBranch(clientInput.branchName, {}).then(function() {
          return 'switched to ' + clientInput.branchName;
        });
    });
}

exports.deleteBranch = (params) => {
    var clientInput = params;

    var checkRes = queryCheck(clientInput , ['title' , 'branchName']);

    if (checkRes !== true) {
        throw new Error('Missing Required Paramenters');
    }

    var pathToRepo = defaultGitPath(clientInput.title);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
        return repo.getBranch(clientInput.branchName).then(function(reference) {
            return Git.Branch.delete(reference);
        });
    });
}

exports.readFileContent = function(params){
    var clientInput = params;
    var _entry;
    var checkRes = queryCheck(clientInput , ['title' , 'fileName' , 'commitSha']);

    if (checkRes !== true) {
        throw new Error('Missing Required Paramenters');
    }

    var pathToRepo = defaultGitPath(clientInput.title);

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
    var checkRes = queryCheck(clientInput , ['title']);

    if (checkRes !== true) {
        throw new Error('Missing Required Paramenters');
    }

    var pathToRepo = defaultGitPath(clientInput.title);

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

function addFile(pathToFile, fileName, fileContent){
    if (typeof fileContent !== 'undefined') {
      //File
      return fse.writeFile(path.resolve(pathToFile));
    } else {
      //Folder
      return fse.ensureDir(path.resolve(pathToFile));
    }
}


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
        // .then(function(head){
        //     if (!inputs.initalCommit) {
        //         return repo.getCommit(head);
        //     }
        // })
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
            return commitId.tostrS();
        });
}
