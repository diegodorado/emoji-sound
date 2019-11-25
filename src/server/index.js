const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('dist'));
app.get('/api/emojis', (req, res) => {
  fs.readFile('./emojis.json', (err, content) => {
    res.send(JSON.parse(content))
  });
});


app.get('/*', function(req, res) {
  console.log(req)
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) =>{
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(8080, () => console.log('Listening on port 8080!'));
