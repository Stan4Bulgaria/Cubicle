//SERVER creation using express and setting express-handlebars
const setViews = require('./config/viewEngine');
const express = require('express');
const app = express();
setViews(app);
app.use(express.static('./src/public'));
//IMPORTING ports from a module
const config = require('./config/config');
//REQUESTS
const router = require('./routes/routes');
app.use(express.urlencoded({extended: false}));
app.use(router);
//STARTING the server
app.listen(config.PORT);
console.log(`Server is listening on port ${config.PORT}...`);
