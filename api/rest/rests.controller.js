var _ = require('lodash')
    var Rest = require('./rest.model');  
     var api_key = 'key-d64fff797f17cb5bade7aa53996ed4e2';
      var domain = 'sandbox96675d7ffc04408aa8ddd848758ee437.mailgun.org';
      var mailgun = require('mailgun-js') ({apiKey: api_key, domain: domain});

    function handleError(res, err) {
      return res.send(500, err);
    }

    exports.index = function(req, res) {
        Rest.find(function (err, rests) {
            if(err) { return handleError(res, err); }
            return res.json(200, rests);
        });
    } ;
    exports.create = function(req, res) {
      req.body.bookings = []
      req.body.reviews = []
      req.body.upvotes = 0 
      req.body.downvotes = 0 
      Rest.create(req.body, function(err, rest) {
          if (err) { return handleError(res, err); }
          return res.json(201, rest);
       });
    };
    exports.show = function(req, res) {
      Rest.findById(req.params.id, function (err, rest) {
          if(err) { return handleError(res, err); }
          return res.json(200, rest);
      });
  } ;
  // Update an existing rests upvotes.
  exports.update_upvotes = function(req, res) {
     Rest.findById(req.params.id, function (err, rest) {
          rest.upvotes = req.body.upvotes
          rest.save(function (err) {
              if(err) { return handleError(res, err); }
              return res.json(200, rest);
          });
      });
  };
  // Update an existing rests downvotes.
  exports.update_downvotes = function(req, res) {
     Rest.findById(req.params.id, function (err, rest) {
          rest.downvotes = req.body.downvotes
          rest.save(function (err) {
              if(err) { return handleError(res, err); }
              return res.json(200, rest);
          });
      });
  };
  // Add a review to a resturant
  exports.add_review = function(req, res) {
     Rest.findById(req.params.id, function (err, rest) {
            var review = {
                body: req.body.body,
                author: req.body.author,
                upvotes: 0,
                downvotes: 0
             }
            rest.reviews.push(review)
            rest.save(function (err) {
              if(err) { return handleError(res, err); }
              var last = _.last(rest.reviews)
              if (last != undefined) {
                 return res.json(200, last);
              } else {
                return res.send(500,"Database error")
                 }
            });
      });
  };

  // Add a booking to the resturants
  exports.add_booking = function(req, res) {
     Rest.findById(req.params.id, function (err, rest) {
            var booking = {
                date: req.body.date,
                times: req.body.times,
                Name: req.body.Name,
                Email: req.body.Email,
                People: req.body.People
             }
             var data = {
                    from: 'SaveMySeat <postmaster@sandbox96675d7ffc04408aa8ddd848758ee437.mailgun.org>',
                    to: req.body.Email,
                    subject: 'Reservation Confirmed',
                    text: 'Your Reservation has been confirmed. Enjoy your meal from all of us at SaveMySeat :)'
                  };
                  mailgun.messages().send(data, function (error, body) {
                      console.log(body);
                  });

            rest.bookings.push(booking)
            rest.save(function (err) {
              if(err) { return handleError(res, err); }
              var last = _.last(rest.bookings)
              if (last != undefined) {
                 return res.json(200, last);

              } else {
                return res.send(500,"Database error")
                 }
            });
      });
  };
     // Update an existing rests spaces.
  exports.updateRestTables = function(req, res) {
     Rest.findById(req.params.rest_id, function (err, rest) {
          rest.Spaces = req.body.table
          rest.Update(function (err) {
              if(err) { return handleError(res, err); }
              return res.json(200, rest);
          });
      });
  };

  // Deletes a customer from datastore.
    exports.destroy = function(req, res) {
        Rest.findById(req.params.rest_id, function (err, rest) {
            rest.remove(function (err) {
                if(err) { return handleError(res, err); }
                return res.send(200,'Deleted');
            });
        })
    };

  exports.update_review_upvotes = function(req, res) {
      Rest.findById(req.params.rest_id, function (err, rest) {
          var review = rest.reviews.id(req.params.review_id)
          if (review) {
            review.upvotes = req.body.upvotes
            rest.save(function (err) {
                if (err) { return handleError(res, err); }
                return res.json(200,review)
              });
          } else {
            return res.send(401,"Bad review id")
          }

       })
    };
      exports.update_review_downvotes = function(req, res) {
      Rest.findById(req.params.rest_id, function (err, rest) {
          var review = rest.reviews.id(req.params.review_id)
          if (review) {
            review.downvotes = req.body.downvotes
            rest.save(function (err) {
                if (err) { return handleError(res, err); }
                return res.json(200,review)
              });
          } else {
            return res.send(401,"Bad review id")
          }

       })
    }