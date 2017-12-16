const Git = require('../../nodegit');
const path = require('path');
const { queryCheck , Formatter, defaultGitPath, picking} = require('../lib');
const promisify = require("promisify-node");
const fse = promisify(require("fs-extra"));

exports.commit = function(req) {
    var clientInput = req.body;
    const visionId = req.params.id;
    var checkRes = queryCheck(clientInput , ['fileContent' , 'fileName' , 'author' , 'authorMail' , 'message']);

    if (checkRes !== true) {
        throw new Error('Missing Required Paramenters');
    }

    var pathToRepo = defaultGitPath(visionId);
    return Git.Repository.open(pathToRepo)
    .then(function(repository){
        return registerCommit(clientInput , repository);
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
              };
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

exports.treeWalk = function(res , req){
    var sha;

    var branchName = req.query.branchName || 'master';
    var pathToRepo = defaultGitPath(req.params.id);

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

exports.status = function(req){
    var pathToRepo = defaultGitPath(req.params.id);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
        return repo.getStatus().then(function(statuses) {
          var allStatus = {};
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
            const statusWord = statusToText(file);
            if (allStatus.hasOwnProperty(statusWord)) {
              allStatus[statusWord].push(file.path());
            } else {
              allStatus[statusWord] = [file.path()];
            }
          });

          return allStatus;
        });
    });
}

exports.treeSummary = function(res , req, vision){
  const pathToRepo = defaultGitPath(req.params.id);
  const branchName = req.query.branchName || 'master';

  return Git.Repository.open(pathToRepo)
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
        return res.status(200).send(Formatter({
            totalContributions : commits.length,
            totalContributors : Object.keys(contributors).length,
            vision: {
              title: vision.title,
              description: vision.description,
              id: vision._id,
              likes: vision.likes.length,
              updatedAt: vision.updatedAt
            }
        }));
      });

      history.start();
  })
  .catch(function(err){
      throw new Error(err.message);
  });
}


exports.getAllBranchList = function(params){
    const pathToRepo = defaultGitPath(params.id);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
      return repo.getReferenceNames(3).then(function(arrayReference) {
        // Use reference
        return arrayReference
        .map(function(reference){
            return {
                name : reference.toString().replace('refs/heads/', ''),
            }
        })
      });
    });
}

exports.createBranch = function(req, res){
    const checkRes = queryCheck(req.body , ['branchName' ]);
    if (!checkRes) {
        return res.status(403).send(Formatter({data : 'Missing Required Parameters'} , true));
    }

    var pathToRepo = defaultGitPath(req.params.id);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
      return repo.getHeadCommit()
      .then(function(commit) {
        return repo.createBranch(
          req.body.branchName.replace(/ /g , '_'),
          commit,
          0);
      });
    });
}

exports.mergeBranches = function(req, res){
  const pathToRepo = defaultGitPath(req.params.id);

  return Git.Repository.open(pathToRepo)
  .then(repo => {
    const now = Date.now() / 1000;
    const signature = Git.Signature.create(req.tokenData.name,
      req.tokenData.mail, now, 480);
    return repo.mergeBranches("master", req.query.sourceBranch, signature);
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

exports.deleteBranch = (params, res) => {
    const checkRes = queryCheck(params , ['branchName']);

    if (checkRes !== true) {
      return res.status(403).send(Formatter({data : 'Missing Required Parameters'} , true));
    }

    const pathToRepo = defaultGitPath(params.id);

    return Git.Repository.open(pathToRepo)
    .then(repo => {
        return repo.getBranch(params.branchName).then(function(reference) {
            return Git.Branch.delete(reference);
        });
    });
}

exports.readFileContent = function(req){
    const visionId = req.params.id;
    var clientInput = req.query;
    var _entry;
    var checkRes = queryCheck(clientInput , ['fileName' , 'commitSha']);

    if (!checkRes) {
        throw new Error('Missing Required Paramenters');
    }

    var pathToRepo = defaultGitPath(visionId);

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
        return blob.toString();//  .split("\n").slice(0, 10).join("\n");
      });
}

exports.gitTest = function(req, res){
    var pathToRepo = defaultGitPath(req.params.id);

    const checkRes = queryCheck(req.query , ['sourceBranch' ]);
    if (!checkRes) {
      return res.status(403).send(Formatter({data : 'Missing Required Parameters'} , true));
    }

    return Git.Repository.open(pathToRepo)
    .then(repo => {
      var now = Date.now() / 1000;
      var signature = Git.Signature.create(req.tokenData.name,
        req.tokenData.mail, now, 480);
      return repo.mergeBranches("master", req.query.sourceBranch, signature);
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
  console.log(inputs, 'inputs');
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
