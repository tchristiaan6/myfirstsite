const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //res.send('Hello World!');
  res.render('index', {title: 'My First Webpage', message: "Hello Again!"});
});

module.exports = router;
