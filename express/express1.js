const express = require("express");
const app = express();
const path = require("path")
const AdminRoutes = require("./routes/admin")
const ShopRoutes = require("./routes/shop")
const mongoose = require("mongoose");


// Middlewares

// use runs for all http request  
app.use((req, res, next) => {
    console.log("always will run")
    next();
})

// to use static files
//http://localhost:3000/css/main.css
// app.use(express.static(path.join(__dirname, 'public')));
//http://localhost:3000/abc => package till public
// http://localhost:3000/abc/css/main.css
// app.use('/abc', express.static(path.join(__dirname, 'public'.'css'))
//http://localhost:3000/abc => css folder
//http://localhost:3000/abc/main.css
app.use("/abc", express.static(path.join(__dirname, 'public')));

// View engine setup
// app.set('views', path.join(__dirname, 'views'))wektkh3pgkh;ehtwf 
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
// built-in express middleware for bodyParser
app.use(express.urlencoded({ extended: true }))

// built-in express middleware for json to object
app.use(express.json())

// to use exported modules
app.use('/admin', AdminRoutes)
app.use(ShopRoutes)

app.use((req, res, next) => {
    res.status(404).send("404 page not found")
})

//error handling in express
// app.use((err, req, res, next) => {
//     res.status(500).send("something broke")
// })

mongoose.connect('mongodb://localhost:27017/onlineshopping', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on 3000');
        });
    })
    .catch(err => console.log(err));