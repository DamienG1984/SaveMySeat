var _ = require('lodash')
var datastore = require('../datastore');

// Get list of rests
exports.index = function(req, res) {
    return res.json(200, datastore.rests);
} ;

exports.show = function(req, res) {
    var index = _.findIndex(datastore.rests , 
           function(rest) {
              return rest.id == req.params.id;
        });      
     if (index != -1) {
        return res.json(200, datastore.rests[index])
      } else {
        return res.send (404)
      }
} ;

// Creates a new rest in datastore.
exports.create = function(req, res) {
    var nextId = 0
    var last = _.last(datastore.rests)
    if (last != undefined) {
       nextId = last.id + 1
    } else {
      nextId = 1
    }
    var rest = {
             RestName: req.body.RestName,
             id: nextId,
             Address: req.body.Address,
             RestInfo: req.body.RestInfo,
             Cuisine: req.body.Cuisine,
              username : req.body.username,
              reviews : [],
              upvotes: 0,
              downvotes: 0,
              Spaces: req.body.tables
          }
    datastore.rests.push(rest)
    return res.json(201, rest);
};

// Update an existing rests upvotes in datastore.
exports.update_upvotes = function(req, res) {
   var index = _.findIndex(datastore.rests , 
           function(rest) {
              return rest.id == req.params.id;
        }); 
    if (index != -1) {
       var rest = datastore.rests[index]
       rest.upvotes =  req.body.upvotes
       return res.send(200, rest) 
    } else {
        return res.send(404)
    }
};

// Add a review to a rest
exports.add_review = function(req, res) {
   var index = _.findIndex(datastore.rests , 
           function(rest) {
              return rest.id == req.params.id;
        }); 
    if (index != -1) {
      var rest = datastore.rests[index]
      var nextId = 0
      var last = _.last(rest.reviews)
      if (last != undefined) {
         nextId = last.id + 1
      } else {
        nextId = 1
      }
      var review = {
              id : nextId ,
              body: req.body.body,
              author: req.body.author ,
              upvotes: 0,
              downvotes: 0
      }
       rest.reviews.push(review)
       return res.send(200, review) 
    } else {
        return res.send(404)
    }
};
 
exports.update_review_upvotes = function(req, res) {
     var rest_index = _.findIndex(datastore.rests , 
           function(rest) {
              return rest.id == req.params.rest_id;
        }); 
     if (rest_index != -1) {
        var rest = datastore.rests[rest_index]
        var review_index = _.findIndex(rest.reviews , 
           function(review) {
              return review.id == req.params.review_id;
        }); 
        if (review_index != -1) {
           rest.reviews[review_index].upvotes =  req.body.upvotes
           return res.send(200, rest.reviews[review_index] ) 
         } else {
           return res.send(404,'Bad review id')
         }
    } else {
        return res.send(404, 'Bad rest id')
    }
};


