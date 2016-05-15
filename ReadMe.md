#Assignment 2 - AngularJS app

Name: Damien Griffin - 02028263

###Overview

SaveMySeat is a web application that allows you to book/reserve a table in a resturant anywhere in Ireland. We are the first deadicated site to provide this service in Ireland.



###User Features 
 
 + View List of Resturants
 + Add Resturant
 + Add Review
 + Make A Reservation
 + Serach feature (Search box searchs all resturant objects for the text entered)
 + Order By Filter
 + Cuisine Filter
 + Confirmation Email
 + View Reservations
 + Delete Resturant

###Installation requirements

. . . .  Software Required to Run SaveMySeat . . . . . . . 
+ AngularJS 1.x
+ Bootstrap 3
+ AngularJS http server
+ Node.js
+ Mongoose
+ Express
+ Mailgun-js
+ MongoDB

In order to run Save My Seat you must first open a terminal window and navigate to the location where you downloaded the SaveMySeatFE folder, once in the folder you need to run npm install, npm install mailgun-js. Start the http-server in the terminal window by entering node app.js and press enter, this should display a message Express Server Listening. Open http://localhost:4000/index.html#/rests in a web browser and the app will load.

###Data Model Design

Diagram of app's data model.

![][image1]


###App Design.

A simple diagram showing the app's component design, in particular controllers and services.

![][image2]

###UI Design.

![][homepage]

![][Resturant List]

![][AddReview]

![][Reservation]

![][AddResturant]

![][ViewReservation]

###Routing

+ /rests - Displays the Home Page
+ /partials/Resturants.html - List of Resturants
+ /rests/:rest_id/Reviews - Displays the Reviews for the current resturant and allows user to add a new review
+ /rests/:rest_id/Bookings - Opens the reservation page which allows users to Book a table
+ /partials/AddResturant.html - Displays the Add Resturant Page

## Web API Endpoint Reference

+ | GET: /api/rests |Returns a list of Resturants |
+ | POST: /api/rests |add a new Resturant |
+ | POST: /api/rests/:id/upvotes |Update Resturant Upvotes|
+ | POST: /api/rests/:id/downvotes |Update Resturant downvotes|
+ | POST: /api/rests/:id/reviews | Create a Resturant Review|
+ | POST: /api/rests/:id/bookings | Create a Resturant Reservation|
+ | PUT: /api/rests/:id/UpdateSpaces | update Resturant Spaces |
+ | POST: /api/rests/:rest_id/Reviews/:review_id/upvotes | Update Resturant Review Upvotes|
+ | POST: /api/rests/:rest_id/Reviews/:review_id/downvotes | Update Resturant Review downvotes|
+ | DELETE: /api/rests/:rest_id/bookings/:booking_id | delete a Resturant |


###Extra features

+ Custom Filters - I created a custom filter to display a distinct list of Cuisines that the user can filter the resturants by. I also create a global search feature which allows the user to search all Resturants at once from a single search box. Sort by filter added which allows the sure to order the resturant by Name (Alphabeticaly), Higest or Lowest Customer Rating.s

+ Bookings - All booking fields are requried and the user will be presented with a message saying the blank field needs to be filled out it Reserve button is pressed and a requried box is blank. If the user enters more than 4 people the code will lower the table count by 2 if 4 or less it only lowers by 1. Each field has its own type example dd/mm/yyyy will bring up a calender if dropdown arrow is pressed. Email field requires a vaild email address etc.

+ Bookings - I used Mailgun-js to send a conformation email to the user to confirm their Reservation.

+ The menu bar has been altered, if the app is been viewed on a smaller device the drop down list closes once the user selects a page to navigate too. The Colours on the Menu bar have also been changed.

+ Add Resturant - All Fields are required and the Add Resturant button can't be clicked until all feilds have been filled out. Upon pressing the Add Resturant is add to the array, fields are set back to blank and the user is automatically redirected to the Resturant List page.

+ I also added a seat icon to the tab in the Browser


###Independent learning.

For my app i researched custom filters, creating a drop down list filter. I also looked into user registration with no server side but was unable to get this working in time. I learned how to make changes to the bootstrap menu bar so it closes on user select when viewing on mobile devices, i was also able to change the colour of the menu bar and hyperlinks. I learned how to implement Mailgun-js to send auto emails confirming the users Reservation.

[image1]: ./Model.png
[image2]: ./Design.png
[homepage]: ./HomePage.png
[Resturant List]: ./ResturantList.png
[AddReview]: ./AddReview.png
[Reservation]: ./Reservation.png
[AddResturant]: ./AddResturant.png
[ViewReservation]: ./ViewReservations.png
