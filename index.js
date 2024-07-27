 const express= require('express');
 const port = 8000;
 const app =express(); 

 const expresLayout= require('express-ejs-layouts');
 app.use(expresLayout);
 app.use(express.static('./assets'));
 app.set('layout extractStyles', true);
 app.set("layout extractScripts", true)
// use router
app.use('/', require('./routes/index'));

 // setup a view engine
 app.set('view engine', 'ejs');
 app.set('views','./views');

 

 app.listen(port,function(err){
    if(err){
        console.log('server not working perfectlly');
    }
    console.log( 'Successfully connected on this port', port);
 })