require('dotenv').config();
const express = require('express');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
var dns = require('dns');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  }
});

let urlRecord = mongoose.model('Url', urlSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use("/api/shorturl", bodyParser.urlencoded({extended: false}));

// Add url and show user the shortened url
app.post("/api/shorturl",
    (req, res) => {
        const og_url = req.body.url;
        const httpRegex = /^(http|https)(:\/\/)/;
        if (!httpRegex.test(og_url)) {
          return res.json({ error: 'invalid url' });
        }
        try {
          const urlObject = new URL(og_url);
          dns.lookup(urlObject.hostname,  (err, addresses, family) => {
            let newUrl = new urlRecord({url: og_url});
            try {
              newUrl.save();
              res.json({original_url: og_url, short_url: newUrl._id});
            }
            catch(err){
              console.error(err);
              res.json({error:"Url cannot be created"});
            }
          });
        }
        catch(err){
          console.error(err);
          res.send({ error: 'invalid url'});
        }        
    }
);

// Redirect user to the appriopriate url based on the database id they enter
app.get("/api/shorturl/:short_url",
    async function(req, res) {
      try{
        const foundUrlRecord = await urlRecord.findById(req.params.short_url, 'url').lean();
        const foundUrl = foundUrlRecord.url;
        res.redirect(foundUrl);
      }
      catch(err){
        console.error(err);
        res.send({error: "No URL found for that id"});
      }
    }
);


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
