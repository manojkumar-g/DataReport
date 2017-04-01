import mongoose from 'mongoose'

const connection = (url) => {
  //plug in promise cause mongo db doesn't suport promise by default
  mongoose.Promise = global.Promise;
  //connection to mongo db using url
  mongoose.connect(url);

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });
  mongoose.connection.once('open', function() {
    console.log('SuccessFully Connected to DB');
});
}
export default connection;
