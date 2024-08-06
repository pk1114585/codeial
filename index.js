const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const { db, mongoClientPromise } = require('./config/mongoose');


// Used for session cookie
const session = require('express-session');
const passport= require('passport');
const flashmiddleware=require('./config/middleware');
const passportLocal= require('./config/passport-local-strategy');
const passportJWTstrategy=require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const saasMiddleware=require('node-sass-middleware');
const flash= require('connect-flash');
app.use(saasMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

const expresLayout = require('express-ejs-layouts');
app.use(expresLayout);

app.use(express.static('./assets'));
// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(express.urlencoded());
app.use(cookieParser());

app.set('layout extractStyles', true);
app.set("layout extractScripts", true)


// setup a view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    /* store: MongoStore.create({
        mongooseConnection: db.getClient, // Use the client from the db instance
        collectionName: 'sessions',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    ) */
        store: MongoStore.create({
            clientPromise: mongoClientPromise,
            collectionName: 'sessions',
            autoRemove: 'disabled'
        })
    
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);

app.use(flash());
app.use(flashmiddleware.setFlash);

// use router
app.use('/', require('./routes/index'));

app.listen(port, function (err) {
    if (err) {
        console.log('server not working perfectlly');
    }
    console.log('Successfully connected on this port', port);
})