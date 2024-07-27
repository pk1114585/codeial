 const express= require('express');
 const port = 8000;
 const app =express(); 

 // use router
 app.use('/', require('./routes/index'));

 app.listen(port,function(err){
    if(err){
        console.log('server not working perfectlly');
    }
    console.log( 'Successfully connected on this port', port);
 })