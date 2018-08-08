const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.ip}: ${req.url}`
  console.log(log);
  fs.appendFile('info.log', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  })
  next();
});
//
// app.use((req, res, next) => {
//   res.render('error.hbs')
// })

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear() ;
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    titlePage: 'Home Page',
    name: 'azooz alharte',
    country: "saudi arabi",
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    titlePage: 'about page',
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error 404'
  });
});

app.get('/github', (req, res) => {
  res.render('github.hbs');
});

app.listen(port, () => {
  console.log(`server up on port ${port}`);
});
