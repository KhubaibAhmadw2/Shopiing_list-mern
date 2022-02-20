 const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');
const path = require('path');

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

//Server static assest if in production

if (process.env.NODE_ENV === 'Production'){
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*',(req , res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`server started on port ${port}`));

