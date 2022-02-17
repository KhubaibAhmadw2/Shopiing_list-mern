 const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');

const items = require('./routes/api/items');


const app = express();

//bodyparser middleware
app.use(bodyParser.json());
//DB config
const db = require('./config/keys').mongoURI;
//connect to mongodb
mongoose
.connect(db)
.then(()=>console.log('Mongodb Connected....'))
.catch(err=>console.log(err));

//use routes
app.use('/api/items',items ); 


const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`server started on port ${port}`));

