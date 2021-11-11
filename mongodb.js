const mongoose = require('mongoose');
const mongoDbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('*********MongoDB Connetion successful***********');
    })
    .catch(err => console.error(err));
};
module.exports = { mongoDbConnection };
