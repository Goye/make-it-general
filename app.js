const express = require('express');
const mongoose = require('mongoose');
require("./user");
const routes = require('./routes');
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/usuarios', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

mongoose.connection.on("error", function(e) { console.error(e); });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(3000, () => console.log('Listening on port 3000!'));
