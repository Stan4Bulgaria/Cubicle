//SERVER creation using express and setting express-handlebars
const setViews = require('./config/viewEngine');
const express = require('express');
const dbInnit = require('./config/dbInnit');
const cookie = require('cookie-parser');
const middlewares = require('./middlewares/authMiddleware');
const app = express();
setViews(app);
app.use(express.static('./src/public'));
//IMPORTING ports from a module
const config = require('./config/config');
//REQUESTS
const router = require('./routes/routes');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(middlewares.authentification);
app.use(router);
//STARTING the DB server
dbInnit()
    .then(() => app.listen(config.PORT, () => console.log(`Server is listening on port ${config.PORT}...`)))
    .catch((err) => console.error(err));
