
/*
 * GET users listing.
 */
var db = require('./../dbConnection.js');

exports.list = function(req, res){
    db.db().collection('badges', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });

};