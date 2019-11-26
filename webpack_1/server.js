const express = require("express");
const app = express();
app.get('/api/info', (req, res) => {
  res.json({
    name: 'sss',
    age: 11,
    msg: 'jjj'
  })
})
app.listen('9999')