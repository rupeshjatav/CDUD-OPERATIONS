const product = require("../models/product");
const Product = require("../models/product")

exports.homePage = (req, res, next) => {

    Product.find().then(
        products => {
            console.log(products)
            res.render('index', { prods: products });
        }).catch(err => console.log(err));

}

exports.getviewProduct = (req, res, next) => {
    Product.findById(req.params['prodId']).then(
        products => {
            res.render('view-product', { producks: products });
        }).catch(err => console.log(err));

    // res.json(prod);
    // [{"product_id":"2","product_name":"poco x2","product_description":"awes"}]
    // res.render('view-product', { producks: prod[0] })
}


exports.geteditProduct = (req, res, next) => {
    Product.findById(req.params['prodId'])
        .then(
            products => {
                res.render('edit-product', { producks: products });

            })
}


exports.posteditProduct = (req, res, next) => {


    // Product.updateOne({ _id: req.body.id }, { $set: { title: req.body.title, price: req.body.price, description: req.body.description } })
    //     .then(result => {
    //         res.redirect('/');
    //     })
    //     .catch(err => console.log(err));



    Product.findByIdAndUpdate(req.params['prodId'])
        .then(
            oldproducts => {
                oldproducts.title = req.body.title;
                oldproducts.price = req.body.price;
                oldproducts.description = req.body.description
                oldproducts.save()
            })
        .then(result => res.redirect('/'))
        .catch(err => console.log(err));

}

exports.deleteProduct = (req, res, next) => {
    // // Product.deleteById(req.body.id);
    // const deleteProductIndex = products.findIndex(p => p.id == req.body.id);
    // products.splice(deleteProductIndex, 1);
    // res.redirect('/');
    // Product.deleteOne({ _id: req.body.id }) //deleteOne mongodb
    // Product.findByIdAndDelete(req.body.id) //findOneAndDelete
    Product.findByIdAndRemove(req.body.id) //findAndModify
        .then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
}