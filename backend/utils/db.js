const mongoose = require('mongoose');
console.log(process.env.MONGO_DB_STRING)
mongoose.connect(process.env.MONGO_DB_STRING)
  .then(() => console.log('Connected!'));