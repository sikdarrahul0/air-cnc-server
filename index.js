const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const port = 5000

const app = express()
app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u2qyt.mongodb.net/airCNC?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const collection = client.db("airCNC").collection("hotel");
  
  app.get('/hotel', (req, res) => {
      collection.find({location: req.query.location})
      .toArray((err, documents)=>{
          res.send(documents);
      })
  })

});

app.get('/', (req, res) => {
  res.send('Air CNC Server!')
})

app.listen(process.env.PORT || port )