const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app =express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = now + ": "+ req.method + req.url;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log("there was an error");
    }
  });
  next();
});

app.use((req,res,next)=>{
  res.render('maintainence.hbs');
  next();
});
app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});
app.get('/',(request,response)=>{
  //response.send("<h1> HELLO </h1>");
  // response.send({
  //   name: "Tanvir",
  //   likes: ["food","travelling"],
  // });

  response.render('home.hbs',{
    pageTitle: "Home Page",
    currentYear: new Date().getFullYear(),
    welcomeMessage: "Welcome!!!",
  });
});

app.get('/about',(request,response) =>{
  response.render('about.hbs',{
    pageTitle: "About Page",
    currentYear: new Date().getFullYear(),
  });
});

app.get('/bad',(request,response) =>{
  response.send({
    errorMessage: "Unable to handle request"
  });
});

app.listen(port, ()=>{
  console.log("app is up on server "+ port)
});
