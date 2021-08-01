const express = require("express")
const fs = require("fs");
const path = require("path")

// const directory = require("./")
const router = express.Router();
const adminController = require("../controllers/admin");

router.get('/add-product', adminController.getProduct)

// data can be retreived at same url
router.post('/add-product', adminController.postProduct)

// router.get('/contact', (req, res, next) => {
//     // file name to add-product.ejs
//     res.render('contact');
//     // fs.createReadStream(path.join('views', 'index.html')).pipe(res)
// })

// router.post('/contact', (req, res) => {
//     console.log(req.body)
//     res.send("response retrived sucessfully")
// })

router.post('/save-product', (req, res) => {
    console.log(req.body)
    res.send("response retrived sucessfully")
})

// using post man 
router.post('/retrived-data', (req, res) => {
    console.log(req.body)
    res.send("done")
})

module.exports = router;