var Git = require('nodegit');

exports.get = function(req, res, next) {
    var pathToRepo = require("path").resolve("C://Cancer");
    var isBare = 0; // lets create a .git subfolder

    Git.Repository.init(pathToRepo, isBare).then(function(repository) {
        // Use repository
        console.log('Got It ' , repository);
    });

    res.status(200).send({data : 'Yep'});
};

// exports.addVisionToContributor = function(req, res, next) {
//     var visionId = req.body.visionId;
//     if (!visionId) return res.status(200).send(Formatter(notifs.missing_required_parameters + ' , visionId' , true));
//
//     contributorModel.findById(req.params.id , function(err , data){
//         data.visions.push({
//             visionId : visionId
//         });
//         data.save(function(err , data){
//             res.status(200).send(Formatter(data));
//         });
//     });
// };
