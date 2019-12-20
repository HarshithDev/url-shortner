require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

//router path
const urlShort = require('./routes/api/urlShorten');

//DB Config
const db = require('./config/keys').mongoUri;

//Connect Db
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log("Database connected succesfully"))
.catch(err => {console.log(err)});

//Body Parser middleware
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)
app.use(bodyParser.json());

//Include routes
app.use("/api/",urlShort)

app.listen(port,console.log(`App running on port ${port}`));