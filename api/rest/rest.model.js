var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var ReviewSchema = new Schema({
        body: { type: String, required: true },
        author: { type: String, required: true },
        upvotes: Number,
        downvotes: Number
      });

    var BookingSchema = new Schema({
        date: { type: String, required: true },
        times: { type: String, required: true },
        Email: { type: String, required: true },
        Name: { type: String, required: true },
        People: Number
      });

    var RestSchema = new Schema({
      RestName: { type: String },
      Address: { type: String },
      RestInfo: { type: String },
      Cuisine: { type: String },
      username : { type: String  },
      bookings : [BookingSchema],
      Spaces: { type: Number },
      reviews : [ReviewSchema],
      upvotes: Number,
      downvotes: Number
    });

    module.exports = mongoose.model('rests', RestSchema);