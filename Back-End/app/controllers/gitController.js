const Git = require('../../nodegit');
const path = require('path');
const { queryCheck , Formatter, defaultGitPath, picking} = require('../lib');
const promisify = require("promisify-node");
const fse = promisify(require("fs-extra"));

exports.commit = function(req) {
    const clientInput = req.body;
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

exports.history = function(systemId, params) {
    const pathToRepo = defaultGitPath(systemId);
    const branchName = params.branchName || 'master';

    return Git.Repository.open(pathToRepo)
    .then(function(repository) {
        return repository.getBranchCommit(branchName);
    })
    .then(function(firstCommit){
        const history = firstCommit.history(Git.Revwalk.SORT.Time);

        return new Promise((resolve, reject) => {
            history.on('end', function(commits) {
                try {
                    const logs = commits.map(function(commit) {
                        return {
                            sha : commit.sha(),
                            author : commit.author().name(),
                            email: commit.author().email(),
                            date : commit.date(),
                            comment : commit.message()
                        };
                    });
                    resolve(logs);
                } catch(e) {
                    reject(e);
                }    
            });

            history.start();
        });        
    });
};

exports.initRepository = function(inputs){
    const { systemId, fileContent, author, authorMail, title } = inputs;
    const pathToRepo = defaultGitPath(systemId);
    
    return fse.ensureDir(path.resolve(pathToRepo))
    .then(function() {
        return Git.Repository.init(path.resolve(pathToRepo), 0);
    })
    .then((repo) => {
        const extraInputs = Object.assign({} , inputs , {
            fileName : "Readme.md",
            fileContent : inputs.description || '',
            message : `${inputs.title || '<No-Title>'} Vision is Born!`,
            initalCommit : true
        });
        return registerCommit(extraInputs , repo);
    });
}

exports.treeWalk = function(systemId , query){
    let sha;
    const branchName = query.branchName || 'master';
    const pathToRepo = defaultGitPath(systemId);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
      return repo.getBranchCommit(branchName);
    })
    .then(function(firstCommit) {
      sha = firstCommit.sha();
      return firstCommit.getTree();
    })
    .then(function(tree) {
      return new Promise((resolve, reject) => {
        try{
            const files = tree.entries().map(entry => {
                return {
                    path:entry.path(),
                    key : entry.sha(),
                    sha : sha,
                    isDirectory : entry.isDirectory(),
                    isFile : entry.isFile(),
                    isTree : entry.isTree(),
                    name : entry.name(), 
                };
            })
            resolve(files);
        } catch(e) {
            reject(e);
        }
      });
    });
}

exports.status = function(systemId){
    const pathToRepo = defaultGitPath(systemId);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
        return repo.getStatus();
    })    
    .then(function(statuses) {
        var allStatus = {};
        
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
}

exports.treeSummary = function(branchName, systemId, likesCount){
  const pathToRepo = defaultGitPath(systemId);

  return Git.Repository.open(pathToRepo)
  .then(function(repository) {
      return repository.getBranchCommit(branchName || 'master');
  })
  .then(function(firstCommit){
      const history = firstCommit.history();
      let contributors = {};

      return new Promise((resolve, reject) => {
        try {
            history.on("commit", function(commit) {
                const author = commit.author();
                const email = author.email();
                const name = author.name();
      
                if (contributors.hasOwnProperty(email)) {
                  //if contributor already counted in
                  contributors[email] += 1;
                } else {
                  //save the first commer
                  contributors[email] = 1
                }
            });
      
            history.on('end', function(commits) {
                resolve({
                    totalContributions : commits.length,
                    totalContributors : Object.keys(contributors).length,
                    likes: likesCount,
                    vision: {
                      title: vision.title,
                      description: vision.description,
                      id: vision._id,
                      likes: vision.likes.length,
                      updatedAt: vision.updatedAt
                    }
                });
            });
      
            history.start();
        } catch(e) {
            reject(e);
        }
      });
  })
  .catch(function(err){
      throw new Error(err.message);
  });
}

exports.getAllBranchList = function(systemId){
    const pathToRepo = defaultGitPath(systemId);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
      return repo.getReferenceNames(3)
    })  
    .then(function(arrayReference) {
        // Use reference
        return arrayReference
        .map(reference => reference.toString().replace('refs/heads/', ''));
     });
    
}

exports.createBranch = function(systemId, branchName){
    const pathToRepo = defaultGitPath(systemId);
    let repository;

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
      repository = repo;
      return repository.getHeadCommit()
    })
    .then(function(commit) {
        return repository.createBranch(branchName.replace(/ /g , '_'), commit, 0);
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

exports.checkoutBranch = function(systemId, branchName){
    const pathToRepo = defaultGitPath(systemId);

    return Git.Repository.open(pathToRepo)
    .then(function(repo) {
        return repo.checkoutBranch(branchName, {})
    })
    .then(function() {
          return 'switched to ' + branchName;
    });
}

exports.deleteBranch = (systemId, branchName) => {
    const pathToRepo = defaultGitPath(systemId);

    return Git.Repository.open(pathToRepo)
    .then(repo => {
        return repo.getBranch(branchName);
    })
    .then(function(reference) {
        return Git.Branch.delete(reference);
    });
}

exports.readFileContent = function(systemId, query){
    const pathToRepo = defaultGitPath(systemId);
    const { commitSha, fileName } = query;
    let _entry;
    const checkRes = queryCheck(query , ['fileName' , 'commitSha']);

    if (!checkRes) {
        throw new Error('Missing Required Paramenters');
    }

    return Git.Repository.open(pathToRepo)
      .then(function(repo) {
        return repo.getCommit(commitSha);
      })
      .then(function(commit) {
        return commit.getEntry(fileName);
      })
      .then(function(entry) {
        _entry = entry;
        return _entry.getBlob();
      })
      .then(function(blob) {
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

function registerCommit(inputs , repo) {
    const { systemId, fileContent, author, authorMail, title, fileName } = inputs;
    var index;
    var oid;
    fse.outputFileSync(path.join(repo.workdir(), fileName), title)
    return repo.refreshIndex()
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
        const _parent = parent ? [parent] : [];
        const now = Date.now() / 1000;
        const author = Git.Signature.create(inputs.author,
          inputs.authorMail, now, 480);
        const committer = Git.Signature.create(inputs.author,
          inputs.authorMail, now, 480);

        return repo.createCommit("HEAD", author, committer, inputs.message, oid, _parent);
    })
}

function statusToText(status) {
    var words = [];
    if (status.isNew()) { words.push("NEW"); }
    if (status.isModified()) { words.push("MODIFIED"); }
    if (status.isTypechange()) { words.push("TYPECHANGE"); }
    if (status.isRenamed()) { words.push("RENAMED"); }
    if (status.isIgnored()) { words.push("IGNORED"); }

    return words.join(" ");
}

