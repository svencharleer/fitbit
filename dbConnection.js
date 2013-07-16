

var mongodb = require("mongodb"),
    mongoserver = new mongodb.Server('ensor.cs.kuleuven.be', 27017, {auto_reconnect: true}),
    db_connector = new mongodb.Db("fitbit", mongoserver);

db_connector.open(function(err, db){
    db.collectionNames(function(err, collections){
        console.log(collections); // ["blog.posts", "blog.system.indexes"]
    });
});

exports.db = function() {return db_connector;};