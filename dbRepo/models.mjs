import mongoose from 'mongoose';


let tweetSchema = new mongoose.Schema({
    text: { type: String, required: true },
    owner: { type: mongoose.ObjectId, ref:"Users", required: true },
    imageUrl: { type: String },
    // likes: [{ type: mongoose.ObjectId }],
    // comments: [{ 
    //  user: {type: mongoose.ObjectId},
    //  commentText: String
    // }],
    isDeleted: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now }
});

export const tweetModel = mongoose.model('tweets', tweetSchema);


const userSchema = new mongoose.Schema({

    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isActive: {type: Boolean, default: true},
    createdOn: { type: Date, default: Date.now },
});

export const userModel = mongoose.model('Users', userSchema);

const otpSchema = new mongoose.Schema({

  otp: String,
  email: String,
  isUsed: {type: Boolean, default: false},
  createdOn: { type: Date, default: Date.now },
});

export const otpModel = mongoose.model('Otp', otpSchema);

const mongodbURI = process.env.mongodbURI || "mongodb+srv://abuser:abuser@cluster0.3psj2vc.mongodb.net/?retryWrites=true&w=majority"

/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongodbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
  console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
  console.log('Mongoose connection error: ', err);
  process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection closed');
    process.exit(0);
  });
});
  ////////////////mongodb connected disconnected events///////////////////////////////////////////////
