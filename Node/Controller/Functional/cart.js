var router = require("express").Router();
module.exports = function (arrg) {
    var { Cart, Product } = arrg.models;

    router.post('/addProductToCart', (req, res, next) => {
        var { p_id } = req.body;
        console.log(p_id);
        Cart.create({ c_id: p_id }).then(() => {
            return res.status(200).send({ header: "Success", content: "Successfully created" })
        }).catch(err => {
            console.log(err.stack)
            return res.status(422).send({ header: "Error", content: "Unable to Add product to cart" });
        });
    })

    router.get('/cart', (req, res, next) => {
        Cart.findAll({ include: [{ model: Product, as: 'products' }] }).then(cart => {
            return res.send({
                success: true,
                msg: cart
            });
        }).catch(err => {
            return res.status(422).send({ header: "Error", content: "No Data Found" });
        });
    })


    router.get('/countItems', (req, res, next) => {
        Cart.count().then(count => {
            return res.send({ success: true, msg: count });
        }).catch(err => {
            return res.status(422).send({ header: "Error", content: "No Data Found" });
        })
    })
    return router;
}