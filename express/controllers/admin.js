const Product = require("../models/product")

exports.getProduct = (req, res, next) => {
    // file name to add-product.ejs
    res.render('add-product')
        // fs.createReadStream(path.join('views', 'index.html')).pipe(res)
}

exports.postProduct = (req, res) => {
    const prod = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    })
    prod.save().then(result => res.redirect('/')).catch(err => console.log(err))
}