// import dependencies 
// import express from 'express';
const express = require('express');

const app = express();
const port = process.env.PORT || 3536;

// set the view engine to ejs
app.set('views', `${process.cwd()}/` + 'views');
app.set('view engine', 'ejs');

// import static files from the public folder
app.use(express.static('public'));

app.get('/home', (req, res) => {
  res.send('Hello world');
});
app.get('/test', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(app.get('env'));
  console.log(process.env.PORT);
  console.log(`Server running on port ${port}`);
});
