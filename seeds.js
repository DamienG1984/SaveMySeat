var mongoose = require('mongoose');
    mongoose.connect('mongodb://test:ewd16@ds035975.mlab.com:35975/customers_db');

    var Rest = require('./api/rest/rest.model');

    Rest.find({}).remove(function() 
    {
      Rest.create(  
                    { 
                    RestName : 'Indian Delights',
                    id : 1,
                    Address : 'Main Street Waterford',
                    RestInfo: "We are the number 1 Indian Resturants in Waterford providing the finest Indian Cuisine for the last 15 years",
                    Cuisine: 'Indian',
                    username : 'jbloggs',
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                                    }
                                ],
                    Spaces: 48,
                    reviews : [
                        {
                         body: ' . . . . my review . . . ',
                         author: 'jbloggs', 
                         upvotes: 2,
                         downvotes: 1 
                    } 
                     ],
                    upvotes : 10,
                    downvotes: 2
                  },
                 { 
                    RestName : 'Pizza World',
                    id : 2,
                    Address : 'Yellow Road Waterford',
                    RestInfo: "You wont find a better Pizzierea in Ireland, Friendly Atmosphere and excellent value",
                    Cuisine: 'Pizza',
                    username : 'notme',
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                     }
                                ],
                    Spaces: 55,
                    reviews : [
                                  {
                                     body: ' Great Atmosphere and Friendly Staff',
                                     author: 'jbloggs', 
                                     upvotes: 2,
                                     downvotes: 1  
                     }
                                ],
                    upvotes : 12,
                    downvotes: 2
                  },
                  { 
                    RestName : 'Momma Mia',
                    id : 3,
                    Address : 'Ardkeen Waterford',
                    RestInfo: "We are a loocal family run business. Enjoy Award winning service with live music Thursday - Sunday",
                    Cuisine: 'Italian',
                    username : 'notme',
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                     }
                                ],
                    Spaces: 30,
                    reviews : [{
                                     body: ' The Steak was amazing, deffinately going back ',
                                     author: 'jbloggs', 
                                     upvotes: 2,
                                     downvotes: 1  
                     }],
                    upvotes : 15,
                    downvotes: 2
                  },
                  { 
                    RestName : 'Happy Days',
                    id : 4,
                    Address : 'Dunmore Road Waterford',
                    RestInfo: "Come and enjoy our traditional Chinese food. Excellent value and special offers 7 Days a week",
                    Cuisine: 'Chinese',
                    username : 'psmith',  
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                     }
                                ],
                    Spaces: 10,
                    reviews : [{
                                     body: ' . . . . my review . . . ',
                                     author: 'jbloggs', 
                                     upvotes: 2,
                                     downvotes: 1  
                     }],
                    upvotes : 2,
                    downvotes: 0
                  },
                  { 
                    RestName : 'Happy Belly',
                    id : 5,
                    Address : 'Main Street Kilkenny',
                    RestInfo: "Excellent Value and get rates on partys. 2015 best Oriential Resturant in Ireland Winner",
                    Cuisine: 'Chinese',
                    username : 'psmith',  
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                     }
                                ],
                    Spaces: 60,
                    reviews : [{
                                     body: ' . . . . my review . . . ',
                                     author: 'jbloggs', 
                                     upvotes: 2,
                                     downvotes: 1  
                     }],
                    upvotes : 2,
                    downvotes: 2
                  },
                  { 
                    RestName : 'Ou LA LA',
                    id : 6,
                    Address : 'Main Street Dublin',
                    RestInfo: "Excellent Value and get rates on partys. 2015 best Resturant in Ireland Winner",
                    Cuisine: 'French',
                    username : 'psmith',  
                    bookings : [
                                  {
                                     date: ' 18-03-2016',
                                     times: '20:00', 
                                     Email: 'Damo05@gmail.com',
                                     Name: 'Damien Griffin',
                                     People: 2 

                     }
                                ],
                    Spaces: 15,
                    reviews : [{
                                     body: ' . . . . my review . . . ',
                                     author: 'jbloggs', 
                                     upvotes: 2,
                                     downvotes: 1  
                     }],
                    upvotes : 2,
                    downvotes: 2
                  }
                  , function() {
          process.exit()
        });
                
    });