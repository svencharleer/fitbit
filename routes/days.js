
/*
 * GET users listing.
 */
var db = require('./../dbConnection.js');

exports.list = function(req, res){
    db.db().collection('days', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });

};
exports.day = function(req, res){
   // var date = new Date(req.params.year, req.params.month ? req.params.month-1 : 0,req.params.day ? req.params.day+1 : 1);
   var fromDate = null, toDate = null;
    if(req.params.month != null && req.params.day != null)
    {
        fromDate = new Date(parseInt(req.params.year), parseInt(req.params.month)-1,parseInt(req.params.day)+1);
        toDate = new Date(fromDate); toDate.setHours(24);

    }
    else if(req.params.month != null)
    {
        fromDate = new Date(req.params.year, req.params.month-1,2);
        toDate =  new Date(req.params.year, req.params.month,0);
    }
    else
    {
        fromDate = new Date(req.params.year, 0,2);
        toDate =  new Date(req.params.year, 12,31);
    }

    console.log(fromDate + " " + toDate);
    db.db().collection('days', function(err, collection) {

            collection.find({date: {$gte: fromDate, $lt: toDate}}).toArray(function(err, items) {
                res.send(items);
            });
    });

};