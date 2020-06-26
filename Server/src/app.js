const express = require("express");
const app = express();
const bodyParser = require("body-parser");
 const mongoose = require("mongoose");
const cors = require('cors');
var path = require("path");
const routev1 = require('./routes/v1');
const passport = require('passport');
const uri2= "mongodb+srv://moastaf98:mostafa118150@honey-yttsl.mongodb.net/test?retryWrites=true&w=majority"
const uri = "mongodb://moastaf98:mostafa118150@honey-shard-00-00-yttsl.mongodb.net:27017,honey-shard-00-01-yttsl.mongodb.net:27017,honey-shard-00-02-yttsl.mongodb.net:27017/test?ssl=true&replicaSet=honey-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.Promise = require("bluebird");
setTimeout(function() {
mongoose.connect(process.env.MONGODB_URL, {
  // server: {
  //   socketOptions: {
  //     socketTimeoutMS: 0,
  //     connectionTimeout: 0
  //   }
  // },
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected successfully!");
  });
},2000)
  mongoose.connection.on('err',err =>{
      console.log(err);
  })

// const MongoClient = require('mongodb').MongoClient;
// const instance = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// // notice 'client' in the callback
// instance.connect((err, client) => {
//   if (err) console.log(err)

//   else {
//     console.log('connected')
//     const collection = client.db("test").collection("students")
//   }
//  });
// if (process.env.NODE_ENV === 'production') {

// app.use(express.static(path.join(__dirname, "../../React/mytest/build")));
// app.get("*", (req,res) => {
//   res.sendFile(path.resolve(__dirname, "../../React/mytest", "build" ,"index.html"))
// })
// }
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "POST, GET, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/api/myroutes',routev1);

 app.use((req,res,next) => {
    res.status(404).send({
        err: "not found!!"
    })
 });
module.exports = app;