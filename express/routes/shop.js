const express = require("express")
const router = express.Router();
const shopController = require("../controllers/shop")

// works same as use but url has to be mandatory
// because it matches the url
router.all("/", shopController.homePage)

// view product 
router.get('/view-product/:prodId', shopController.getviewProduct);

router.get('/edit-product/:prodId', shopController.geteditProduct)
router.post('/edit-product/:prodId', shopController.posteditProduct)

router.post('/delete-product', shopController.deleteProduct)
module.exports = router;