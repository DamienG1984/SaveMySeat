
  var SaveMySeatApp = angular.module('SaveMySeatApp', ['ngRoute'])

    SaveMySeatApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/rests', {
            templateUrl: 'partials/Main.html',
            //controller: 'ResturantController'
          })
          .when('/rests/:rest_id/Reviews',
          {
              templateUrl: './partials/Reviews.html',
              controller: 'ReviewsController'
          })
          .when('/rests/:rest_id/Bookings',
          {
              templateUrl: './partials/Bookings.html',
              controller: 'BookingsController'
          })
          .when('/partials/Resturants.html',
          {
              templateUrl: 'partials/Resturants.html',
              controller: 'ResturantController'
          })
          .when('/rests/:rest_id/ViewBookings',
          {
              templateUrl: './partials/ViewBookings.html',
              controller: 'BookingsController'
          })
          .when('/partials/AddResturant.html',
          {
              templateUrl: 'partials/AddResturant.html',
              controller: 'ResturantController'
          })
          .otherwise({
            redirectTo: '/rests'
          })
      }])

    SaveMySeatApp.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
})

    SaveMySeatApp.controller('ResturantController', ['$scope', 'RestService',
          function($scope,RestService) {
              RestService.getRests()
                  .success(function(rests) {
                       $scope.rests = rests;
                  });
          
                $scope.incrementUpvotes = function(rest) {
                   RestService.upvoteRest(rest._id, rest.upvotes + 1 )
                      .success(function(updated_rest) {
                          rest.upvotes = updated_rest.upvotes
                      })
                }// End of incrementUpvotes

                 $scope.incrementdownvotes = function(rest) {
                   RestService.downvoteRest(rest._id, rest.downvotes + 1 )
                      .success(function(updated_rest) {
                          rest.downvotes = updated_rest.downvotes
                      })
                }// End of incrementdownvotes

                 $scope.addrest = function(){
          var rest = 
            {
              RestName: $scope.newrest.RestName,
              Address: $scope.newrest.Address,
              RestInfo: $scope.newrest.RestInfo,
              Cuisine: $scope.newrest.Cuisine,
              username : $scope.newrest.username,
              Spaces: $scope.newrest.tables,
            }
              RestService.addrest(rest)
                .success(function(added_rest) {
                   $scope.rests.push(added_rest);
                   $scope.newrest = { }
          });
          window.location = 'http://localhost:4000/index.html#/partials/Resturants.html'; // Redirect to Resturant list after Resturant has been added
        } // End of addrest
    }])

SaveMySeatApp.controller('ReviewsController', ['$scope',
       'RestService', 
       '$routeParams',
        function ($scope,RestService ,$routeParams) {
          RestService.getRest($routeParams.rest_id)
              .success(function(rest) {
                   $scope.rest = rest;
              });

             $scope.incrementUpvotes = function(review) {
               RestService.upvoteRestReview($scope.rest._id, review._id , 
                        review.upvotes + 1 )
                  .success(function(updated_review) {
                      review.upvotes = updated_review.upvotes
                  })
            }

             $scope.incrementdownvotes = function(review) {
               RestService.downvoteRestReview($scope.rest._id, review._id , 
                        review.downvotes + 1 )
                  .success(function(updated_review) {
                      review.downvotes = updated_review.downvotes
                  })
            }

          $scope.addreview = function(){
                    if($scope.review.body === '') { return; }
                    var review = {
                        body: $scope.review.body,
                        author: $scope.review.author
                    }
                    RestService.addRestReview($scope.rest._id, review )
                        .success(function(added_review) {
                            $scope.rest.reviews.push(added_review)
                            $scope.review = {} ;   
                        })
            }
        }])

SaveMySeatApp.controller('BookingsController', ['$scope',
       'RestService', 
       '$routeParams',
       function ($scope,RestService ,$routeParams) {
          RestService.getRest($routeParams.rest_id)
              .success(function(rest) {
                   $scope.rest = rest;
              });

      $scope.deleteBooking = function(booking) {
               RestService.DeleteRestBook($scope.rest._id, booking._id, booking)
                  .success(function(delete_booking) {
                      $scope.rest.bookings.splice(booking._id,1)
                  })
            }

       $scope.addBooking = function(){
                    if($scope.book.body === '') { return; }
                    var booking = {
                          date: $scope.book.date,
                          times: $scope.book.times,
                          Name: $scope.book.Name,
                          Email: $scope.book.Email,
                          People: $scope.book.People
                    };
                   
                    if ($scope.book.People < 5)
                      {
                      var table = $scope.rest.Spaces -= 1; 
                      } else
                      {
                        var table = $scope.rest.Spaces -= 2;  
                      }
                  console.log(table);

                //update the no of tables free
                   RestService.updateRestTables($scope.rest._id, table )
                        .success(function(added_table) {
                            $scope.rest.Spaces.$update(added_table)
                        })
              
                    // add booking
                    RestService.addRestBooking($scope.rest._id, booking )
                        .success(function(added_booking) {
                            $scope.rest.bookings.push(added_booking)
                            $scope.booking = {} ;   
                             $scope.book = {} ; 
                        })
            }
        }])

 SaveMySeatApp.factory('RestService', ['$http', function($http){
   var api = {
     getRests : function() {
           return $http.get('/api/rests')
     },
     addrest : function(rest) {
          return $http.post('/api/rests',rest)
     },
     addRestReview : function(rest_id, review) {
          return $http.post('/api/rests/' + rest_id + '/reviews' ,
                            review)
     },
      addRestBooking : function(rest_id, booking) {
          return $http.post('/api/rests/' + rest_id + '/bookings' ,
                            booking)
     },
     DeleteRestBook :function(rest_id, booking_id, booking ) {
          return $http.delete('/api/rests/' + rest_id + '/bookings/'
                        + booking_id, booking)
    },
     updateRestTables : function(rest_id, table) {
          return $http.put('/api/rests/' + rest_id + '/UpdateSpaces' ,
                            table)
     },

     upvoteRest : function(rest_id, new_upvote_count ) {
          return $http.post('/api/rests/' + rest_id + '/upvotes', 
                     {upvotes: new_upvote_count })
     },
     downvoteRest : function(rest_id, new_downvote_count ) {
          return $http.post('/api/rests/' + rest_id + '/downvotes', 
                     {downvotes: new_downvote_count })
     },
     upvoteRestReview : function(rest_id, review_id, new_upvote_count ) {
          return $http.post( '/api/rests/' +
                      rest_id + '/reviews/' +  review_id + '/upvotes', 
                     {upvotes: new_upvote_count })
     },
     downvoteRestReview : function(rest_id, review_id, new_downvote_count ) {
          return $http.post( '/api/rests/' +
                      rest_id + '/reviews/' +  review_id + '/downvotes', 
                     {downvotes: new_downvote_count })
     },
     getRest : function(rest_id) {
        return $http.get('/api/rests/' + rest_id )
     }
  }
  return api
}])