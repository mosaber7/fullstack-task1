const express = require('express');

const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
var axios = require("axios").default;

const app = express();

const db = "mongodb+srv://isaber:saber123@cluster0.ttlwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


app.get('/', (req, res, next) => {
  res.redirect('/blogs');
  next()
});

app.use((res,req,next) => {
console.log("Hello from middleare!");
next();
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/github/:id', (req,res,next) => {
    var options = {
    method: 'GET',
    url: 'https://api.github.com/users/'+req.params.id, 
  };

  axios.request(options).then(function (response) {
    let data;
    data = response.data;
    res.render('stats', {title: 'Github', user: data});
  }).catch(function (error) {
    console.error(error);
  });
  
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});